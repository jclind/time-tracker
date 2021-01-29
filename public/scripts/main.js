// Initialize times array and tags array.
let timesInfoList = [];
let timeTags = [{name: 'main', color: 'red'}];

// Initialize 
let h = 0, m = 0, s = 0, ms = 0;
let elapsedTime = 0;   
let timer;
let stopwatchEl = document.querySelector('.time');


let tagDistributionGraph;
let ctxTagDis;


// Set variables for sorting the time table.
let currSortedRow = 'time-table-header-date', currSortedRowName = 'Date';
// Create tag data variables
let tagLabels, tagData, tagColors;






// Functions to be called on window load from auth.js
function onWindowLoad() {
    tagLabels = [];
    tagData = [];
    tagColors = [];
    updateTagsList();
    console.log('this should have worked man')
    sortTimeTable(currSortedRowName);
    
    
    // Draw initial tagDistributionGraph.
    ctxTagDis = document.getElementById('tag-distribution').getContext('2d');
    getTagData();
    // If an old chart exists, remove the whole chart.
    if (tagDistributionGraph) {
        tagDistributionGraph.destroy();
    }
    tagDistributionGraph = new Chart(ctxTagDis, {
        type: 'doughnut',
        data: {
            labels: tagLabels,
            datasets: [{
                data: tagData,
                backgroundColor: tagColors
            }]
        },
        options: {
            elements: {
                arc: {
                    borderWidth: 0,
                }
            },
            title: {
                text: "Tag Time Distribution",
                display: true
            },
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    fontColor: '#fff'
                },
                fullWidth: true,
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        let label;
                        if (timesInfoList.length == 0) {
                            label = "No Data"
                        } else {
                            label = msToString(data['datasets'][0]['data'][tooltipItem['index']])
                        }
                        return label;
                    }
                },
                yAlign: "bottom",
                titleAlign: 'center',
                bodyAlign: 'center',
                titleFontSize: 17,
                bodyFontSize: 15,
                bodyFontStyle: 'bold',
                xPadding: 10,
                yPadding: 10,
                displayColors: false,
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
            },
            plugins: {
                afterDraw: function (chart, option) {
                    let theCenterText = "50%" ;
                    const canvasBounds = canvas.getBoundingClientRect();
                    const fontSz = Math.floor( canvasBounds.height * 0.10 ) ;
                    chart.ctx.textBaseline = 'middle';
                    chart.ctx.textAlign = 'center';
                    chart.ctx.font = fontSz+'px Arial';
                    chart.ctx.fillText(theCenterText, canvasBounds.width/2, canvasBounds.height*0.70 )
                },
                datalabels: {
                    display: false,
                    formatter: (value, ctxTagDis) => {
                        let sum = 0;
                        let dataArr = ctxTagDis.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(1) + '%';
                        return percentage;
                    },
                    color: '#292929',
                    font: {
                        weight: 'bold',
                        size: 13,
                    }
                }
            }
        }
    });
    updateTagDistributionGraph();
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
        saveUserData();
        clear();
    }
}

// Keep the current array that will be displayed in the times table. (helpful for deleting time objects later)
let currentTimesArray;
// Updates the html list of times based on submittion and deletion of times.
function updateTimesList(arr) {
    currentTimesArray = arr;
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
            <td class='time-table-tag'><div class="" onclick='showChangeTagModal(${i})'>${arr[i].timeTag.name}</div></td>
            <td>${arr[i].time.hours}:${(arr[i].time.minutes < 10 ? "0" + arr[i].time.minutes : arr[i].time.minutes)}:${(arr[i].time.seconds < 10 ? "0" + arr[i].time.seconds : arr[i].time.seconds)}.${(arr[i].time.milliseconds < 10 ? "0" + arr[i].time.milliseconds : arr[i].time.milliseconds)}</td>
            <td>${arr[i].date}</td>
            <td data-id=${i}>${currTotalTime}</td>
            <td>
                <div class="table-options-buttons">
                    <button class="table-edit-button" onclick="toggleEditTagModal(${i})">Edit</button>
                    <button class="table-delete-button">Delete</button>
                </div>
            </td>
        </tr>`
    }
    // !FIXME
    // if (currFinalTotalTime != undefined) {
    //     document.getElementById('time-table-total-time-value').innerText = `${currFinalTotalTime}`;
    // } else {
    //     document.getElementById('time-table-total-time-value').innerText = `0:00.00`;

    // }
}
$(document)
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
    saveUserData();
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

    saveUserData();
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
        let tagColor = selectedTagColor;
        console.log(selectedTagColor)

        let tempTagObj = {name: tagName, color: tagColor}
        timeTags.push(tempTagObj)
        closeTagModal('new-tag-btn-modal');
        saveUserData();
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
    if (timesInfoList.length != 0) {
        document.getElementById(currSortedRow).querySelector('i').style.display = 'block';
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
    } else {
        updateTimesList(timesInfoList);
    }
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

// Manipulate account nav bar modals

// Initialize nav bar modal/blur-overlay divs
// const accountModal = document.querySelector('#account-modal');
// const accountModalBlur = document.querySelector('.account-modal-blur');
// const loginModal = document.querySelector('#login-modal');
// const loginModalBlur = document.querySelector('.login-modal-blur');
// const logoutModal = document.querySelector('#logout-modal');
// const logoutModalBlur = document.querySelector('.logout-modal-blur');
// const signupModal = document.querySelector('#signup-modal');
// const signupModalBlur = document.querySelector('.signup-modal-blur');


// If account modal is visible, hide modal and backgorund overlay. If it is hidden, show both overlay and modal
// function accountModalBtn() {
//     if (accountModal.style.display == 'none' || accountModal.style.display == '') {
//         accountModal.style.display = 'block';
//         accountModalBlur.style.display = 'block';
//         document.body.style.overflow = 'hidden';
//     } else {
//         accountModal.style.display = 'none';
//         accountModalBlur.style.display = 'none';
//         document.body.style.overflow = 'visible';
//     }
// }
// If login modal is visible, hide modal and backgorund overlay. If it is hidden, show both overlay and modal
// function loginModalBtn() {
//     if (loginModal.style.display == 'none' || loginModal.style.display == '') {
//         loginModal.style.display = 'block';
//         loginModalBlur.style.display = 'block';
//         document.body.style.overflow = 'hidden';
//     } else {
//         loginModal.style.display = 'none';
//         loginModalBlur.style.display = 'none';
//         document.body.style.overflow = 'visible';
//         loginForm.reset();
//     }
// }
// If signup modal is visible, hide modal and backgorund overlay. If it is hidden, show both overlay and modal
// function signupModalBtn() {
//     if (signupModal.style.display == 'none' || signupModal.style.display == '') {
//         signupModal.style.display = 'block';
//         signupModalBlur.style.display = 'block';
//         document.body.style.overflow = 'hidden';
//     } else {
//         signupModal.style.display = 'none';
//         signupModalBlur.style.display = 'none';
//         document.body.style.overflow = 'visible';
//         // Reset form inputs
//         signupForm.reset();
//     }
// }

// Listeners for modal overlay-blur click to close modals.
// document.querySelector('.account-modal-blur').addEventListener('click', function() {
//      accountModalBtn();
// });
// document.querySelector('.login-modal-blur').addEventListener('click', function() {
//     loginModalBtn();
// });
// document.querySelector('.signup-modal-blur').addEventListener('click', function() {
//     signupModalBtn();
// });


// When blured background is clicked on, close the tag-input background and modal.
// document.getElementById('new-tag-blur-overlay').addEventListener('click', () => {hideTagCreateModal()})

// Blurs background and shows new tag input modal on button click
// function showTagCreateModal() {
//     document.body.style.overflow = 'hidden';
//     document.getElementById('new-tag-blur-overlay').style.display = 'block';
//     document.getElementById('new-tag-modal').style.display = 'block';
//     document.getElementById('tag-input-text').focus();
// }

// function hideTagCreateModal() {
//     document.body.style.overflow = 'visible';
//     document.getElementById('new-tag-blur-overlay').style.display = 'none';
//     document.getElementById('new-tag-modal').style.display = 'none';
//     document.getElementById('tag-input-text').style.border = '1px solid rgb(190, 190, 190)';
//     document.getElementById('tag-input-text').value = '';
//     document.getElementById('color-select-container').style.border = 'none';
//     if (selectedTagColor != '') {
//         document.getElementById(`${selectedTagColor}`).classList.remove('active');
//         selectedTagColor = '';
//     }
// }






// $(document).on('keyup', '#change-tag-modal-search-input', function () {
//     let userTagName = document.getElementById('change-tag-modal-search-input').value;
//     searchChangeTags(userTagName);
// })

// function searchChangeTags(userTagName) {
//     let modTimeTags = [];
//     for (time in timeTags) {
//         let currTag = timeTags[time].name.toUpperCase();
//         if (currTag.includes(userTagName.toUpperCase())) {
//             modTimeTags.push(timeTags[time])
//         }
//         updateChangeTagModal(modTimeTags)
//     }
// }


// Holds index of clicked tag in the table for access in editing which tag that object will have.
// let currChangeModalIndex;

// function showChangeTagModal(index) {
//     document.body.style.overflow = 'hidden';
//     currChangeModalIndex = index;
//     document.getElementById('change-tag-modal').style.display = 'block';
//     document.getElementById('change-tag-blur-overlay').style.display = 'block';
//     updateChangeTagModal(timeTags);
// }

// Call hideChangeTagModal on click outside of the modal.
// document.getElementById('change-tag-blur-overlay').addEventListener('click', () => {hideChangeTagModal()})

// function hideChangeTagModal() {
//     document.body.style.overflow = 'visible';
//     document.getElementById('change-tag-modal').style.display = 'none';
//     document.getElementById('change-tag-blur-overlay').style.display = 'none';
//     selectedChangeModalTag = '';
// }





// Gets time data for each tag and creates arrays: tagLabels, tagData, and tagColors
function getTagData() {
    tagLabels = [];
    tagData = [];
    tagColors = [];
    if (timesInfoList.length != 0) {
        // Loop through time tags and find sum of all timesInfoList item milliseconds associated with that tag.
        for (tag in timeTags) {
            let currTagName = timeTags[tag].name;
            let tagSum = 0;
            for (item in timesInfoList) {
                if ((timesInfoList[item].timeTag.name == currTagName)) {
                    tagSum += stringToMS(timesInfoList[item].time)
                }
            }
            if (tagSum != 0) {
                tagLabels.push(currTagName)
                tagData.push(tagSum)
                let currColor = timeTags[tag].color;
                tagColors.push(currColor)
            } 
        }
    } else {
        tagLabels = [''];
        tagData = [100];
        tagColors = ['Gray'];
    }
}

function updateTagDistributionGraph() {
    getTagData();
    // Check to make sure there is data to be displayed in the graph
    if (tagLabels.length != 0 && timesInfoList.length != 0) {
        // If there is data
        tagDistributionGraph.data.labels = tagLabels;
        tagDistributionGraph.data.datasets[0].data = tagData;
        tagDistributionGraph.data.datasets[0].backgroundColor = tagColors;
        
        tagDistributionGraph.options.elements.arc.borderWidth = 1;
        tagDistributionGraph.options.legend.display = true;
        tagDistributionGraph.options.plugins.datalabels.display = true;
        tagDistributionGraph.update();
    } else {
        // If there is no data
        tagDistributionGraph.options.elements.arc.borderWidth = 0;
        tagDistributionGraph.options.legend.display = false;
        tagDistributionGraph.options.plugins.datalabels.display = false;
        tagDistributionGraph.update();
    }
}

// Nav functionality and Modals
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate nav
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        })
        // Burger animation
        burger.classList.toggle('toggle');
    });
}
navSlide();

// Control account type modals
const navModalBlur = document.querySelector('#nav-modal-blur');
const toggleNavModal = () => {
    // Find the button with toggle-modal class that was clicked. 
    let currModalId;
    // Nav button event listener
    $('.toggle-nav-modal').click(function () {
        currModalId = this.id + "-modal"
        // Toggle navModalBlur to block on modal button click
        console.log(currModalId)
        navModalBlur.style.display = "block"
        document.getElementById(currModalId).style.display = "block"
    })
    // Background nav modal blur event listener
    navModalBlur.addEventListener('click', () => {
        // toggle navModalBlur
        closeNavModal(currModalId);
    })

}
toggleNavModal();

const closeNavModal = (id) => {
    const currForm = document.getElementById(id)
    navModalBlur.style.display = "none"
    // Close modal
    document.getElementById(id).style.display = "none"
}


// Tag creation/editing modals
const tagModalBlur = document.querySelector('#tag-modal-blur')
const toggleCreateTagModal = () => {
    const tagModal = document.querySelector('#new-tag-btn-modal')
    const cancelBtn = document.querySelector('#cancel-create-tag-btn');
    $('#new-tag-btn').click(() => {
        tagModalBlur.style.display = 'block'
        tagModal.style.display = 'block'
    })
    tagModalBlur.addEventListener('click', () => {
        closeTagModal('new-tag-btn-modal');
    })
    cancelBtn.addEventListener('click', () => {
        closeTagModal('new-tag-btn-modal')
    })
}
toggleCreateTagModal();

let currChangeModalIndex;
function toggleEditTagModal(index) {
    currChangeModalIndex = index;
    const editTagModal = document.querySelector('#change-tag-modal')
    const cancelBtn = document.querySelector('#cancel-change-modal-btn')
    const nameInput = document.querySelector('#change-tag-modal-name-input-field');
    // toggle edit time modal.
    if (editTagModal.style.display == "none" || editTagModal.style.display == "") {
        editTagModal.style.display = "block";
        tagModalBlur.style.display = "block";
        nameInput.value = currentTimesArray[index].name;
        updateChangeTagModal(timeTags)
    }
    tagModalBlur.addEventListener('click', () => {
        closeTagModal('change-tag-modal');
    })
    cancelBtn.addEventListener('click', () => {
        closeTagModal('change-tag-modal')
    })
}
// Call searchChangeTags function when typing into change tag info modal search bar.
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
        tagModalContainer.innerHTML += `
        <div class="change-tag-modal-tag" id="${currTag}" onclick='selectChangeTagModalTag(${tag})'>
            <div class="change-tag-modal-tag-color"  style="background: ${arr[tag].color}"></div>
            <div class="change-tag-modal-tag-title">${arr[tag].name}</div>
        </div>
        `
    }
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
        let tempTimesArrIndex = null;
        timesInfoList.forEach((o1, index) => {
            if (objEqual(o1, currentTimesArray[currChangeModalIndex])) {
                tempTimesArrIndex = index;
            }
        })
        if (tempTimesArrIndex == null) {
            console.log("No! This is not how this should be working!!!!!!! :(")
        } else {
            let tempName = document.querySelector('#change-tag-modal-name-input-field').value;
            timesInfoList[tempTimesArrIndex].name = tempName;
            timesInfoList[tempTimesArrIndex].timeTag = timeTags[selectedChangeModalTagIndex]
            console.log(tempTimesArrIndex)
            closeTagModal('change-tag-modal')
            saveUserData();
        }
    }   
    selectedChangeModalTag = '';
}


const closeTagModal = (id) => {
    tagModalBlur.style.display = 'none'
    document.getElementById(id).style.display = 'none';
    selectedChangeModalTag = '';
}


