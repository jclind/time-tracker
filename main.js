var timesInfoList = [];
var listOfTimesSum = [];

var ms = 0, s = 0, m = 0, h = 0;
var prevTime, stopwatchInterval, elapsedTime = 0;   
var timer;
var stopwatchEl = document.querySelector('.time');


function startStop() {
    var startStopElText = document.getElementById('start-stop-btn').innerText;
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

function clear() {
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        elapsedTime = 0;
        ms = 0, s = 0, m = 0, h = 0;
        stopwatchEl.textContent = '0:00:00.00';
        document.getElementById('website-title').innerText = 'StopWatch'
    }
}

// Find total time so far for each element 
function findElapsedTime(index) {
    let totH = 0, totM = 0, totS = 0, totMs = 0;

    console.log(index)
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
    // return `${totH}:${(totM < 10 ? "0" + totM : totM)}:${(totS < 10 ? "0" + totS : totS)}.${(totMs < 10 ? "0" + totMs : totMs)}`;

}


function submit() { 
    // only allow submition when the timer is stopped and the time is not 0.
    if ((document.getElementById('start-stop-btn').innerText === 'Start') && document.getElementById('time').textContent !== '0:00:00.00') {
        let d = new Date;
        let month = d.getUTCMonth() + 1;
        let day = d.getUTCDate();
        let year = d.getUTCFullYear();
        
        let timeName = document.getElementById('title-input').value;
        if (timeName === '') {
            timeName = 'Creative Name';
        }

        let timeCur = {hours: h, minutes: m, seconds: s, milliseconds: ms};
        listOfTimesSum.push(timeCur);
        
        let dateCur = month + "/" + day + "/" + year;
        
        let totTime = findElapsedTime(timesInfoList.length - 1);
        
        let temp = {name: timeName, time: timeCur, date: dateCur, totalTime: totTime};
    
        timesInfoList.push(temp);
        
        document.getElementById('title-input').value = '';
        updateList();
        clear();
    }
}



function updateList() {
    document.getElementById('time-table').innerHTML = `
    <tr>
        <th>Title</th>
        <th>Time</th>
        <th>Date</th>
        <th>Total Time</th>
    </tr>`
    for (let i = 0; i < timesInfoList.length; i++) {
        let elapsedTime = findElapsedTime(i); 
        document.getElementById('time-table').innerHTML += `
        <tr id='times-row'> 
            <td contenteditable="true" class="name" data-id="${i}">${timesInfoList[i].name}</td>
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

function deleteItem(i) {
    // Get index of clicked row.
    let rowIndex = i;

    // Delete the clicked object at rowIndex
    timesInfoList.splice(rowIndex, 1);

    updateList();
}


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


updateList();




