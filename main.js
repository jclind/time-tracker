// Array of objets of times and data about times.
let timesInfoList = [];

let timeTags = [{name: 'main', color: 'red'}];

let h = 0, m = 0, s = 0, ms = 0;
let elapsedTime = 0;   
let timer;
let stopwatchEl = document.querySelector('.time');

// Set timesInfoList to the localStorage array and update the list on page load. 
window.onload = function() {
    console.log(localStorage.getItem('timesInfoList'));
    console.log(localStorage.getItem('timeTags'))
    if (localStorage.getItem('timesInfoList') != null) {
        timesInfoList = JSON.parse(localStorage.getItem('timesInfoList'));
        console.log('bingussssss')
    }
    if (localStorage.getItem('timeTags') != null) {
        timeTags = JSON.parse(localStorage.getItem('timeTags'))
        console.log('kingusssss')
    }
    updateTagsList();
    sortTimeTable(currSortedRowName)
}


// Use local storage to save timesInfoList
function saveData() {
    console.log('saving data', timesInfoList)
    // Save timesInfoList in localstorage
    if (localStorage.getItem('timesInfoList') == null) {
        console.log('this hoe be empty')
        localStorage.setItem('timesInfoList', JSON.stringify(timesInfoList))
    } else {
        console.log('this hoe aint be empty no more')
        localStorage.removeItem('timesInfoList')
        localStorage.setItem('timesInfoList', JSON.stringify(timesInfoList))
    }

    if (localStorage.getItem('timeTags') == null) {
        localStorage.setItem('timeTags', JSON.stringify(timeTags))
    } else {
        localStorage.removeItem('timeTags')
        localStorage.setItem('timeTags', JSON.stringify(timeTags)) 
    }
}

function startStop() {
    var startStopElText = document.getElementById('start-stop-btn').innerText;

    // If the timer is not runing. 
    if (startStopElText === 'Start'){
        // change clear button to be grayed out when the timer is going
        document.getElementById('clear-btn').style.background = 'rgb(58, 58, 58)';
        document.getElementById('clear-btn').style.color = 'gray';

        // change submit button to be grayed out when the timer is going
        document.getElementById('submit-btn').style.background = 'rgb(58, 58, 58)';
        document.getElementById('submit-btn').style.color = 'gray';

        document.getElementById('start-stop-btn').innerText = 'Stop';

        let st = Date.now() - elapsedTime;
        let intervalIndex = 0;
        timer = setInterval(() => {
            let currT = Date.now();
            elapsedTime = currT - st;
            tempT = elapsedTime;

            ms = Math.floor((tempT % 1000) / 10);
            tempT = Math.floor(tempT / 1000);
            s = tempT % 60;
            tempT = Math.floor(tempT / 60);
            m = tempT % 60;
            tempT = Math.floor(tempT / 60);
            h = tempT % 60;
            
            intervalIndex++;
            stopwatchEl.textContent = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + "." + (ms < 10 ? "0" + ms : ms);
            document.getElementById('website-title').innerText = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        }, 10);
    } else {
        // change clear button back to orange when timer stops
        document.getElementById('clear-btn').style.background = 'rgb(252, 161, 43)';
        document.getElementById('clear-btn').style.color = 'black';

        // change submit button back to orange when timer stops
        document.getElementById('submit-btn').style.background = 'rgb(252, 161, 43)';
        document.getElementById('submit-btn').style.color = 'black';
        

        document.getElementById('start-stop-btn').innerText = 'Start';
        clearInterval(timer);
        timer = false;
    }
}

// Clears clears current time from the timer screen
function clear() {
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        elapsedTime = 0;
        ms = 0, s = 0, m = 0, h = 0;
        stopwatchEl.textContent = '0:00:00.00';
        document.getElementById('website-title').innerText = 'Stopwatch'
    }
}

// Find total time so far for each element, returns object with array of hours, minutes, seconds, and milliseconds
function findElapsedTime(index, arr) {
    let totH = 0, totM = 0, totS = 0, totMs = 0;
    for (let i = 0; i < index + 1; i++) {
        totH += arr[i].time.hours;
        totM += arr[i].time.minutes;
        totS += arr[i].time.seconds;
        totMs += arr[i].time.milliseconds

        // fix additions of times. i.e. add to minutes if seconds is over or equal to 60 seconds. 
        if (totMs >= 100) {
            totMs -= 100;
            totS++;
        }
        if (totS >= 60) {
            totS -= 60;
            totM++; 
        }
        if (totM >= 60) {
            totM -= 60; 
            totH++;
        }
    }
    return {hours: totH, minutes: totM, seconds: totS, milliseconds: totMs};

}

// Submits user's time to timesInfoList array and html list
function submit() { 
    // only allow submition when the timer is stopped and the time is not 0.
    if ((document.getElementById('start-stop-btn').innerText === 'Start') && document.getElementById('time').textContent !== '0:00:00.00') {
        // Set time name and clear name input feild 
        let timeName = document.getElementById('title-input').value;
        if (timeName === '') {
            timeName = 'Creative Name';
        }
        document.getElementById('title-input').value = '';

        // Set time date
        let d = new Date;
        let month = d.getUTCMonth() + 1;
        let day = d.getUTCDate();
        let year = d.getUTCFullYear();
        
        let dateCur = month + "/" + day + "/" + year;

        // Set actual time for time object
        let timeCur = {hours: h, minutes: m, seconds: s, milliseconds: ms};
        
        // Set time object's total time
        let totTime;
        if (timesInfoList != null) {
            totTime = findElapsedTime(timesInfoList.length - 1, timesInfoList);
        } else {
            totTime = timeCur;
        }

        // Set time's tag to the first element in the timeTags array
        let tagCur = timeTags[0];

        // Push name, time, date, and total time to object and push that to timesInfoList array
        let temp = {name: timeName, time: timeCur, date: dateCur, totalTime: totTime, timeTag: tagCur};
        timesInfoList.push(temp);

        // Save timesInfoList to localstroage, update the html list, and clear the timer on submit of time.
        saveData();
        sortTimeTable(currSortedRowName);
        clear();
    }
}

// Updates the html list of times based on submittion and deletion of times.
function updateTimesList(arr) {
    document.getElementById('time-table-body').innerHTML = ``
    // loops through arr and displays each time object
    let currFinalTotalTime;
    for (let i = 0; i < arr.length; i++) {
        let elapsedTime = findElapsedTime(i, arr); 
        let currTotalTime = `${elapsedTime.hours}:${(elapsedTime.minutes < 10 ? "0" + elapsedTime.minutes : elapsedTime.minutes)}:${(elapsedTime.seconds < 10 ? "0" + elapsedTime.seconds : elapsedTime.seconds)}.${(elapsedTime.milliseconds < 10 ? "0" + elapsedTime.milliseconds : elapsedTime.milliseconds)}`;
        if (i == arr.length - 1) {
            currFinalTotalTime = currTotalTime;
        }
        let currTimesRow = `times-row-${i}`
        document.getElementById('time-table-body').innerHTML += `
        <tr id='${currTimesRow}'> 
            <td contenteditable="true" class="name" data-id="${i}" spellcheck='false'>${arr[i].name}</td>
            <td class='time-table-tag'><div onclick='showChangeTagModal(${i})'>${arr[i].timeTag.name}</div></td>
            <td>${arr[i].time.hours}:${(arr[i].time.minutes < 10 ? "0" + arr[i].time.minutes : arr[i].time.minutes)}:${(arr[i].time.seconds < 10 ? "0" + arr[i].time.seconds : arr[i].time.seconds)}.${(arr[i].time.milliseconds < 10 ? "0" + arr[i].time.milliseconds : arr[i].time.milliseconds)}</td>
            <td>${arr[i].date}</td>
            <td data-id=${i}>${currTotalTime}</td>
            <td><button onclick='deleteItem(${i})'>X</button></td>
        </tr>`
    }

    document.getElementById('time-table-total-time-value').innerText = `${currFinalTotalTime}`;

}

$(document).on('keyup', '#time-search-input', function () {
    let userInput = document.getElementById('time-search-input').value;
    timesListSearch(userInput)
})

function timesListSearch(userTimeName) {
    let modTimesInfoList = [];
    for (time in timesInfoList) {
        let currTimesInfoListName = timesInfoList[time].name.toUpperCase();
        if (currTimesInfoListName.includes(userTimeName.toUpperCase())) {
            modTimesInfoList.push(timesInfoList[time])
        }
    }
    updateTimesList(modTimesInfoList);
}


$(document).on('input', '.name', function (e) {
    const index = $(this).data('id')
    timesInfoList[index].name = $(this).text()
})

// Calculates and runs the timer, sets h, m, s, and ms, with each webpage clock cycle
function run() {
    stopwatchEl.textContent = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + "." + (ms < 10 ? "0" + ms : ms);
    ms++;
    if (ms == 100) {
        ms = 0;
        s++;
    }
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
}

// Removes desired time object from the array of times and updates the list
function deleteItem(i) {
    // Get index of clicked row.
    let rowIndex = i;

    // Delete the clicked object at rowIndex
    timesInfoList.splice(rowIndex, 1);

    // Updates the list of times and saves the data to the localstorage 
    saveData();
    updateTimesList(timesInfoList);
}



function updateTagsList() {
    selectedTag = document.getElementById('selected-tag');
    dropdownEls = document.getElementById('dropdown-list');
    dropdownEls.innerHTML = '';
    for (tag in timeTags) {
        if (tag == 0) {
            selectedTag.innerHTML = timeTags[0].name;
        } else {
            dropdownEls.innerHTML += `
            <div class="dropdown-item" onclick='selectTag(${tag})'>
                <div class="dropdown-item-name">${timeTags[tag].name}</div>
                <div class="delete-tag" onclick='deleteTag(${tag}, event)'>+</div>
            </div>
            `
        }
    }
}

function selectTag(index) {
    let tempTag = timeTags[index];
    timeTags[index] = timeTags[0];
    timeTags[0] = tempTag;
    updateTagsList();
    saveData();
}

function deleteTag(index, e) {   
    // Update timesInfoList to change from the deleted tag. 
    for (time in timesInfoList) {
        if (timesInfoList[time].timeTag.name == timeTags[index].name) {
            timesInfoList[time].timeTag = timeTags[0];
        }
    }
    
    // Stop click from outer div from occuring
    e.stopPropagation();
    timeTags.splice(index, 1)

    updateTimesList(timesInfoList);
    updateTagsList();
    saveData();
}


function createTag() {
    if (document.getElementById('tag-input-text').value === '') {
        // Add shake animation class
        $("#tag-input-text").addClass('tag-input-animation')
        // Reset shake animation class (allows for multiple uses of animation)
        $("#tag-input-text").bind('oanimationend animationend webkitAnimationEnd', function() {
            $("#tag-input-text").removeClass('tag-input-animation')
        });
        document.getElementById('tag-input-text').style.border = '1px solid red';
    } else if (selectedTagColor === ''){
        // Add shake animation class
        $("#color-select-container").addClass('tag-input-animation')
        // Reset shake animation class (allows for multiple uses of animation)
        $("#color-select-container").bind('oanimationend animationend webkitAnimationEnd', function() {
            $("#color-select-container").removeClass('tag-input-animation')
        });
        document.getElementById('color-select-container').style.border = '1px solid red';
    } else {
        document.getElementById('tag-input-text').style.border = '1px solid rgb(190, 190, 190)';
        
        let tagName = document.getElementById('tag-input-text').value;
        let tagColor = selectedTagColor

        let tempTagObj = {name: tagName, color: tagColor}
        timeTags.push(tempTagObj)
        saveData();
        updateTagsList();
        hideTagCreateModal();
    }
}

// Remove red border on tag input feild when typing.
$('#tag-input-text').on('keyup', () => {
    let tagInputText = document.getElementById('tag-input-text')
    if (tagInputText.style.border === '1px solid red') {
        tagInputText.style.border = '1px solid rgb(190, 190, 190)'
    }
})

$('#color-select-container').on('click', () => {
    let colorSelect = document.getElementById('color-select-container')
    if (colorSelect.style.border === '1px solid red') {
        colorSelect.style.border = 'none';
    }
})





currSortedRow = 'time-table-header-date'
currSortedRowName = 'Date'
$(document).on('click', '.time-table-title-cell', function (e) {
    let lastSortedRowEl = currSortedRow;
    
    // Set tempEvent to the current event when object is clicked
    let tempEvent = e.currentTarget
    let tempEl = tempEvent.id;
    currSortedRow = tempEl;
    
    // If clicked object does not have a visible caret, then the caret will be displayed 
    // and the last clicked object's caret will be removed. If caret is visible in clicked object
    // it will be oriented upwards or downwards respective to how it is currently oriented on click.
    if (document.getElementById(currSortedRow).querySelector('i').style.display == 'none') {
        document.getElementById(lastSortedRowEl).querySelector('i').style.display = 'none';
        document.getElementById(currSortedRow).querySelector('i').style.display = 'block';
        currSortedRowName = tempEvent.getAttribute("name")
    } else if (document.getElementById(currSortedRow).querySelector('i').classList.contains('fa-caret-down')) {
        document.getElementById(currSortedRow).innerHTML = `
            <span>${currSortedRowName}</span>
            <i class="fa fa-caret-up"></i>
        `;
    } else {
        document.getElementById(currSortedRow).innerHTML = `
            <span>${currSortedRowName}</span>
            <i class="fa fa-caret-down"></i>
        `;
    }

    sortTimeTable(currSortedRowName);
})

function sortTimeTable(sortName) {
    document.getElementById(currSortedRow).querySelector('i').style.display = 'block';
    if (timesInfoList != null) {
        if (sortName == 'Title') {
            // Sorts by alphabetical order of time titles
            let titleSortTimesList = timesInfoList.sort((a, b) => a.name.localeCompare(b.name)).slice();
            // Check direction of the caret.
            if (document.getElementById(currSortedRow).querySelector('i').classList.contains('fa-caret-up')) {
                titleSortTimesList = titleSortTimesList.reverse();
            }
            updateTimesList(titleSortTimesList);
    
        } else if (sortName == 'Tag') {
            // Sorts by alphabetical order of time tags
            let tagSortTimesList = timesInfoList.sort((a, b) => a.timeTag.name.localeCompare(b.timeTag.name)).slice();
            
            if (document.getElementById(currSortedRow).querySelector('i').classList.contains('fa-caret-up')) {
                tagSortTimesList = tagSortTimesList.reverse();
            }
            updateTimesList(tagSortTimesList);
        } else if (sortName == 'Time') {
            // Sorts by amount of time.
            let timeSortTimesList = timesInfoList.slice();
            // Bubble sorts timesInfoList array by time value in timeSortTimesList array
            for (let i = 0; i < timesInfoList.length - 1; i++) {
                for (let j = 0; j < timesInfoList.length - i - 1; j++) {
                    if (compareTimeObjects(timeSortTimesList[j].time, timeSortTimesList[j + 1].time) == -1) {
                        tempTime = timeSortTimesList[j]
                        timeSortTimesList[j] = timeSortTimesList[j + 1]
                        timeSortTimesList[j + 1] = tempTime
                    }
                } 
            }
    
            if (document.getElementById(currSortedRow).querySelector('i').classList.contains('fa-caret-up')) {
                timeSortTimesList = timeSortTimesList.reverse();
            }
    
            updateTimesList(timeSortTimesList)
    
        } else if (sortName == 'Date') {
            let dateSortTimesList = timesInfoList.sort((a, b) => a.date.localeCompare(b.date)).slice();
            if (document.getElementById(currSortedRow).querySelector('i').classList.contains('fa-caret-up')) {
                dateSortTimesList = dateSortTimesList.reverse();
            }
            updateTimesList(dateSortTimesList)
        }
    }
}

// if -1 a < b, if 0 a = b, if 1 a > b
function compareTimeObjects(a, b) {
    let aStr = `${a.hours}:${(a.minutes < 10 ? "0" + a.minutes : a.minutes)}:${(a.seconds < 10 ? "0" + a.seconds : a.seconds)}.${(a.milliseconds < 10 ? "0" + a.milliseconds : a.milliseconds)}`
    let bStr = `${b.hours}:${(b.minutes < 10 ? "0" + b.minutes : b.minutes)}:${(b.seconds < 10 ? "0" + b.seconds : b.seconds)}.${(b.milliseconds < 10 ? "0" + b.milliseconds : b.milliseconds)}`
    return aStr.localeCompare(bStr);
}



// Event listeners for html buttons
document.getElementById('clear-btn').addEventListener('click', clear);
document.getElementById('submit-btn').addEventListener('click', submit);

// Disable clear button hover effect. 
document.getElementById('clear-btn').onmouseover = function() {
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        document.getElementById('clear-btn').style.background = 'rgb(247, 172, 75)';
        document.getElementById('clear-btn').style.border = '2px solid rgb(252, 161, 43)'
        document.getElementById('clear-btn').style.cursor = 'pointer';
    }
}
document.getElementById('clear-btn').onmouseleave = function() {
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        document.getElementById('clear-btn').style.background = 'rgb(252, 161, 43)';
        document.getElementById('clear-btn').style.border = '1px solid #2d2d2d'
        document.getElementById('clear-btn').style.cursor = 'default';
    }
}

// Disable submit button hover effect. 
document.getElementById('submit-btn').onmouseover = function() {
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        document.getElementById('submit-btn').style.background = 'rgb(247, 172, 75)';
        document.getElementById('submit-btn').style.border = '2px solid rgb(252, 161, 43)'
        document.getElementById('submit-btn').style.cursor = 'pointer';
    }
}
document.getElementById('submit-btn').onmouseleave = function() {
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        document.getElementById('submit-btn').style.background = 'rgb(252, 161, 43)';
        document.getElementById('submit-btn').style.border = '1px solid #2d2d2d'
        document.getElementById('submit-btn').style.cursor = 'default';
    }
}

// When blured background is clicked on, close the tag-input background and modal.
document.getElementById('new-tag-blur-overlay').addEventListener('click', () => {hideTagCreateModal()})

// Blurs background and shows new tag input modal on button click
function showTagCreateModal() {
    document.getElementById('new-tag-blur-overlay').style.display = 'block';
    document.getElementById('new-tag-modal').style.display = 'block';
    document.getElementById('tag-input-text').focus();
}

function hideTagCreateModal() {
    document.getElementById('new-tag-blur-overlay').style.display = 'none';
    document.getElementById('new-tag-modal').style.display = 'none';
    document.getElementById('tag-input-text').style.border = '1px solid rgb(190, 190, 190)';
    document.getElementById('tag-input-text').value = '';
    document.getElementById('color-select-container').style.border = 'none';
    if (selectedTagColor != '') {
        document.getElementById(`${selectedTagColor}`).classList.remove('active');
        selectedTagColor = '';
    }
}

// Control color selection for tags
let selectedTagColor = '';

function selectColor(color) {
    if (selectedTagColor != '') {
        document.getElementById(`${selectedTagColor}`).classList.remove('active');
    }
    selectedTagColor = color;
    document.getElementById(`${color}`).classList.add('active');
}



function updateChangeTagModal(arr) {
    tagModalContainer = document.getElementById('change-tag-modal-tag-container');
    tagModalContainer.innerHTML = '';
    for (tag in arr) {
        let currTag = `change-tag-modal-tag-${tag}`
        let currColor;
        switch (arr[tag].color) {
            case 'red': 
                currColor = '#fd483f';
                break;
            case 'pink':
                currColor = '#fd889a';
                break;
            case 'brown':
                currColor = '#9A6324';
                break;
            case 'orange':
                currColor = '#fca12b';
                break;
            case 'yellow':
                currColor = '#ffe119'
                break;
            case 'lime':
                currColor = '#bfef45';
                break;
            case 'dark-green':
                currColor = '#0a724f';
                break;
            case 'mint':
                currColor = '#AAF0D1';
                break;
            case 'blue':
                currColor = '#7cc3db';
                break;
            case 'navy':
                currColor = '#3D3D90';
                break;
            case 'lavendar':
                currColor = '#cc99cc';
                break;
            case 'purple':
                currColor = '#926adb';
                break;
            default:
                console.log('Color Selection Error')
        }


        tagModalContainer.innerHTML += `
        <div class="change-tag-modal-tag" id="${currTag}" onclick='selectChangeTagModalTag(${tag})'>
            <div class="change-tag-modal-tag-color"  style="background: ${currColor}"></div>
            <div class="change-tag-modal-tag-title">${arr[tag].name}</div>
        </div>
        `
    }
}

$(document).on('keyup', '#change-tag-modal-search-input', function () {
    let userTagName = document.getElementById('change-tag-modal-search-input').value;
    searchChangeTags(userTagName);
})

function searchChangeTags(userTagName) {
    let modTimeTags = [];
    for (time in timeTags) {
        let currTag = timeTags[time].name.toUpperCase();
        if (currTag.includes(userTagName.toUpperCase())) {
            modTimeTags.push(timeTags[time])
        }
        updateChangeTagModal(modTimeTags)
    }
}


// Holds index of clicked tag in the table for access in editing which tag that object will have.
let currChangeModalIndex;

function showChangeTagModal(index) {
    currChangeModalIndex = index;
    document.getElementById('change-tag-modal').style.display = 'block';
    document.getElementById('change-tag-blur-overlay').style.display = 'block';
    updateChangeTagModal(timeTags);
}

// Call hideChangeTagModal on click outside of the modal.
document.getElementById('change-tag-blur-overlay').addEventListener('click', () => {hideChangeTagModal()})

function hideChangeTagModal() {
    document.getElementById('change-tag-modal').style.display = 'none';
    document.getElementById('change-tag-blur-overlay').style.display = 'none';
    selectedChangeModalTag = '';
}

let selectedChangeModalTag = '';
// Holds index of selected tag to be changed in the change tag modal.
let selectedChangeModalTagIndex;
// Control tag selection for changing tags
function selectChangeTagModalTag(index) {
    selectedChangeModalTag = `change-tag-modal-tag-${index}`
    selectedChangeModalTagIndex = index;
    document.getElementById(selectedChangeModalTag).style.background = 'rgb(238, 238, 238)'
    for (tag in timeTags) {
        currTag = `change-tag-modal-tag-${tag}`
        if ((tag != index) && (document.getElementById(currTag).style.background == 'rgb(238, 238, 238)')) {
            document.getElementById(currTag).style.background = 'white';
        }
    }
}

// Remove red boarder when item is selected in change tag modal.
document.getElementById('change-tag-modal-tag-container').addEventListener('click', () => {
    if (document.getElementById('change-tag-modal-tag-container').style.border == '2px solid red') {
        document.getElementById('change-tag-modal-tag-container').style.border = 'none'
    }
})

function changeTag() {
    // Add red border to change tag modal when the user doesn't select a tag to change to.
    if (selectedChangeModalTag == '') {
        document.getElementById('change-tag-modal-tag-container').style.border = '2px solid red'
    } else {
        timesInfoList[currChangeModalIndex].timeTag = timeTags[selectedChangeModalTagIndex]
    }
    updateTimesList(timesInfoList);
    hideChangeTagModal();
    saveData();
    selectedChangeModalTag = '';
}
