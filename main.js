var timesInfoList = [];




var ms = 0, s = 0, m = 0, h = 0;
var timer;

var stopwatchEl = document.querySelector('.time');



function startStop() {
    var startStopElText = document.getElementById('start-stop-btn').innerText;
    if (startStopElText === 'Start'){
        document.getElementById('clear-btn').style.background = 'rgb(58, 58, 58)';
        document.getElementById('clear-btn').style.color = 'gray';
        
        document.getElementById('start-stop-btn').innerText = 'Stop';
        timer = setInterval(run, 10);
    } else {
        document.getElementById('clear-btn').style.background = 'rgb(252, 161, 43)';
        document.getElementById('clear-btn').style.color = 'black';

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
    let d = new Date;
    let month = d.getUTCMonth() + 1;
    let day = d.getUTCDate();
    let year = d.getUTCFullYear();

    let timeName = document.getElementById('title-input').value;
    let timeCur = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + "." + (ms < 10 ? "0" + ms : ms);
    let dateCur = month + "/" + day + "/" + year;
    let totTime = '5:00:00.00'
    
    let temp = {name: timeName, time: timeCur, date: dateCur, totalTime: totTime};

    timesInfoList.push(temp);
    
    document.getElementById('title-input').value = '';
    updateList();
    clear();
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
            <td>${timesInfoList[i].time}</td>
            <td>${timesInfoList[i].date}</td>
            <td>${timesInfoList[i].totalTime}</td>
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