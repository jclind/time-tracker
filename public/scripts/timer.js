// JS for timer element of time-tracker

const startStop = () => {
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
const clear = () => {
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
        const d = new Date;
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let year = d.getFullYear();
        
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

// Calculates and runs the timer, sets h, m, s, and ms, with each webpage clock cycle
const run = () => {
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


const timerButtonControls = () => {
    const startStopBtn = document.getElementById('start-stop-btn');
    const clearBtn = document.getElementById('clear-btn');
    const submitBtn = document.getElementById('submit-btn');
    // Event listeners for html buttons
    clearBtn.addEventListener('click', clear);
    submitBtn.addEventListener('click', submit);
    
    // Disable clear button hover effect. 
    clearBtn.onmouseover = function() {
        if (startStopBtn.innerText === 'Start') {
            clearBtn.style.background = 'rgb(247, 172, 75)';
            clearBtn.style.border = '2px solid rgb(252, 161, 43)'
            clearBtn.style.cursor = 'pointer';
        }
    }
    clearBtn.onmouseleave = function() {
        if (startStopBtn.innerText === 'Start') {
            clearBtn.style.background = 'rgb(252, 161, 43)';
            clearBtn.style.border = '1px solid #2d2d2d'
            clearBtn.style.cursor = 'default';
        }
    }
    
    // Disable submit button hover effect. 
    submitBtn.onmouseover = function() {
        if (startStopBtn.innerText === 'Start') {
            submitBtn.style.background = 'rgb(247, 172, 75)';
            submitBtn.style.border = '2px solid rgb(252, 161, 43)'
            submitBtn.style.cursor = 'pointer';
        }
    }
    submitBtn.onmouseleave = function() {
        if (startStopBtn.innerText === 'Start') {
            submitBtn.style.background = 'rgb(252, 161, 43)';
            submitBtn.style.border = '1px solid #2d2d2d'
            submitBtn.style.cursor = 'default';
        }
    }
}
timerButtonControls()