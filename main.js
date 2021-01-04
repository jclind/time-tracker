// Array of objets of times and data about times.
var timesInfoList = [];

var timeTags = [{name: 'main', color: 'red'}]

var h = 0, m = 0, s = 0, ms = 0;
var elapsedTime = 0;   
var timer;
var stopwatchEl = document.querySelector('.time');

// Set timesInfoList to the localStorage array and update the list on page load. 
window.onload = function() {
    timesInfoList = JSON.parse(localStorage.getItem('timesInfoList'));
    timeTags = JSON.parse(localStorage.getItem('timeTags'))
    updateTimesList();
    updateTagsList();
}

// Use local storage to save timesInfoList
function saveData() {
    // Save timesInfoList in localstorage
    if (localStorage.getItem('timesInfoList') != null) {
        // reset data in localStorage to push new array back in if the localStorage already has objects in it.
        localStorage.removeItem('timesInfoList');
        localStorage.setItem('timesInfoList', JSON.stringify(timesInfoList))
    } else {
        localStorage.setItem('timesInfoList', JSON.stringify(timesInfoList))
    }

    // Save timeTags in localstorage 
    if (localStorage.getItem('timeTags') != null) {
        localStorage.removeItem('timeTags');
        localStorage.setItem('timeTags', JSON.stringify(timeTags));
    } else {
        localStorage.setItem('timeTags', JSON.stringify(timeTags));
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
        document.getElementById('website-title').innerText = 'StopWatch'
    }
}

// Find total time so far for each element, returns object with array of hours, minutes, seconds, and milliseconds
function findElapsedTime(index) {
    let totH = 0, totM = 0, totS = 0, totMs = 0;

    for (let i = 0; i < index + 1; i++) {
        totH += timesInfoList[i].time.hours;
        totM += timesInfoList[i].time.minutes;
        totS += timesInfoList[i].time.seconds;
        totMs += timesInfoList[i].time.milliseconds

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
        let totTime = findElapsedTime(timesInfoList.length - 1);

        // Set time's tag to the first element in the timeTags array
        let tagCur = timeTags[0];

        // Push name, time, date, and total time to object and push that to timesInfoList array
        let temp = {name: timeName, time: timeCur, date: dateCur, totalTime: totTime, timeTag: tagCur};
        timesInfoList.push(temp);

        // Save timesInfoList to localstroage, update the html list, and clear the timer on submit of time.
        saveData();
        updateTimesList();
        clear();
    }
}

// Updates the html list of times based on submittion and deletion of times.
function updateTimesList() {
    document.getElementById('time-table').innerHTML = `
    <tr>
        <th>Title</th>
        <th>Tag</th>
        <th>Time</th>
        <th>Date</th>
        <th>Total Time</th>
    </tr>`
    // loops through timesInfoList and displays each time object
    for (let i = 0; i < timesInfoList.length; i++) {
        let elapsedTime = findElapsedTime(i); 
        document.getElementById('time-table').innerHTML += `
        <tr id='times-row'> 
            <td contenteditable="true" class="name" data-id="${i}">${timesInfoList[i].name}</td>
            <td class='time-table-tag'><div onclick='showChangeTagModal(${i})'>${timesInfoList[i].timeTag.name}</div></td>
            <td>${timesInfoList[i].time.hours}:${(timesInfoList[i].time.minutes < 10 ? "0" + timesInfoList[i].time.minutes : timesInfoList[i].time.minutes)}:${(timesInfoList[i].time.seconds < 10 ? "0" + timesInfoList[i].time.seconds : timesInfoList[i].time.seconds)}.${(timesInfoList[i].time.milliseconds < 10 ? "0" + timesInfoList[i].time.milliseconds : timesInfoList[i].time.milliseconds)}</td>
            <td>${timesInfoList[i].date}</td>
            <td data-id=${i}>${elapsedTime.hours}:${(elapsedTime.minutes < 10 ? "0" + elapsedTime.minutes : elapsedTime.minutes)}:${(elapsedTime.seconds < 10 ? "0" + elapsedTime.seconds : elapsedTime.seconds)}.${(elapsedTime.milliseconds < 10 ? "0" + elapsedTime.milliseconds : elapsedTime.milliseconds)}</td>
            <td><button onclick='deleteItem(${i})'>X</button></td>
        </tr>`
    }
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
    updateTimesList();
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
            console.log(timeTags[0]);
            timesInfoList[time].timeTag = timeTags[0];
        }
    }
    
    // Stop click from outer div from occuring
    e.stopPropagation();
    timeTags.splice(index, 1)

    updateTimesList();
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


// Control tag selection for changing tags

let selectedTag = '';

// function selectChangingTag(tag) {
//     if (selectedTag = )
// }


function updateChangeTagModal() {
    tagModalContainer = document.getElementById('change-tag-modal-tag-container');
    tagModalContainer = '';
    for (tag in timeTags) {
        tagModalContainer += `
        <div class="change-tag-modal-tag">
            <div class="change-tag-modal-tag-color" style="background: ${timeTags[tag].color}"></div>
            <div class="change-tag-modal-tag-title">${timeTags[tag].name}</div>
        </div>
        `
    }
}

function showChangeTagModal(index) {
    document.getElementById('change-tag-modal').style.display = 'block';
    document.getElementById('change-tag-blur-overlay').style.display = 'block';
}

document.getElementById('change-tag-blur-overlay').addEventListener('click', () => {hideChangeTagModal()})

function hideChangeTagModal() {
    document.getElementById('change-tag-modal').style.display = 'none';
    document.getElementById('change-tag-blur-overlay').style.display = 'none';
}
