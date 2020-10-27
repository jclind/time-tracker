var timesInfoList = [];
var listOfTimesSum = [];


var ms = 0, s = 0, m = 0, h = 0;
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
        timer = setInterval(run, 10);
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
        ms = 0, s = 0, m = 0, h = 0;
        stopwatchEl.textContent = '0:00:00.00';
    }
}

function submit() { 
    if (document.getElementById('start-stop-btn').innerText === 'Start') {
        let d = new Date;
        let month = d.getUTCMonth() + 1;
        let day = d.getUTCDate();
        let year = d.getUTCFullYear();
    
        let timeName = document.getElementById('title-input').value;

        let timeCur = {hours: h, minutes: m, seconds: s, milliseconds: s};
        listOfTimesSum.push(timeCur);
        
        let dateCur = month + "/" + day + "/" + year;
        
        // calc total time
        let totH = 0, totM = 0, totS = 0, totMs = 0;
        for (let i = 0; i < listOfTimesSum.length; i++) {
            totH += listOfTimesSum[i].hours;
            totM += listOfTimesSum[i].minutes;
            totS += listOfTimesSum[i].seconds;
            totMs += listOfTimesSum[i].milliseconds;

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
        let totTime = {hours: totH, minutes: totM, seconds: totS, milliseconds: totMs}
        
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
        document.getElementById('time-table').innerHTML += `
        <tr>
            <td>${timesInfoList[i].name}</td>
            <td>${timesInfoList[i].time.hours}:${(timesInfoList[i].time.minutes < 10 ? "0" + timesInfoList[i].time.minutes : timesInfoList[i].time.minutes)}:${(timesInfoList[i].time.seconds < 10 ? "0" + timesInfoList[i].time.seconds : timesInfoList[i].time.seconds)}.${(timesInfoList[i].time.milliseconds < 10 ? "0" + timesInfoList[i].time.milliseconds : timesInfoList[i].time.milliseconds)}</td>
            <td>${timesInfoList[i].date}</td>
            <td>${timesInfoList[i].totalTime.hours}:${(timesInfoList[i].totalTime.minutes < 10 ? "0" + timesInfoList[i].totalTime.minutes : timesInfoList[i].totalTime.minutes)}:${(timesInfoList[i].totalTime.seconds < 10 ? "0" + timesInfoList[i].totalTime.seconds : timesInfoList[i].totalTime.seconds)}.${(timesInfoList[i].totalTime.milliseconds < 10 ? "0" + timesInfoList[i].totalTime.milliseconds : timesInfoList[i].totalTime.milliseconds)}</td>
        </tr>`
    }
}

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

document.getElementById('clear-btn').addEventListener('click', clear);
document.getElementById('submit-btn').addEventListener('click', submit);

updateList();


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