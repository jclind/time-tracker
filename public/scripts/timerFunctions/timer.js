// !! Don't need??
// let h = 0,
//     m = 0,
//     s = 0,
//     ms = 0

// Initiate timer element which will be the interval
let timer
let stopwatchEl = document.getElementById('time')
let elapsedTime = 0

let timerIsRunning = false

console.log('here now dog')
let currStartingTime
let currFinishedTime = null

if (window.innerWidth >= 600) {
    stopwatchEl.innerText = '0:00:00.00'
} else {
    stopwatchEl.innerText = '00:00.00'
}

// Control functionality and loop of the timer element
const startStop = isRunning => {
    // Get time element that holds the actual counting time
    let timeEl = document.getElementById('time')

    // Get inner text of start stop button
    let startStopElText = document.getElementById('startStopBtn').innerText

    // If the timer is not runing.
    if (isRunning) {
        // Set timerIsRunning to true when the interval starts running the timer
        timerIsRunning = true

        // If the timer is at 0, then set the 'currStartingTime' to the current date/time
        if (elapsedTime === 0) {
            currStartingTime = new Date()
        }
        // Let startTime equal the current date minues how much time is already on the timer (if any)
        let startTime = Date.now() - elapsedTime

        timer = setInterval(() => {
            let currTime = Date.now()
            // Set elapsedTime equal to the current time minus the startTime
            elapsedTime = currTime - startTime

            // Format the elapsed time from milliseconds into standard time format
            let formattedTime = formatTime(elapsedTime)

            // Set Timer element and title of website to the formatted time
            stopwatchEl.textContent = formattedTime
            document.getElementById('websiteTitle').innerText = formattedTime
        }, 10)
    } else {
        // Set timerIsRunning to false when the interval stops running the timer
        timerIsRunning = false

        // Set curr finished time equal to current time
        if (elapsedTime !== 0) {
            currFinishedTime = new Date()
        }
        // Stop the timer interval
        clearInterval(timer)
        timer = false
    }
    controlTimerButtons(timerIsRunning, elapsedTime)
}

const clearTime = () => {
    elapsedTime = 0
    stopwatchEl.textContent = formatTime(elapsedTime)
    document.getElementById('websiteTitle').innerText = 'Stopwatch'
    controlTimerButtons(timerIsRunning, elapsedTime)
}

const msToTimeObjFormat = time => {
    let tempTime = time
    let h = 0,
        m = 0,
        s = 0,
        ms = 0

    // Calculate hours, minutes, seconds, and milliseconds from tempTime in milliseconds
    if (tempTime >= 3600000) {
        h = Math.floor(tempTime / 3600000)
        tempTime = tempTime % 3600000
    }
    if (tempTime >= 60000) {
        m = Math.floor(tempTime / 60000)
        tempTime = tempTime % 60000
    }
    if (tempTime >= 1000) {
        s = Math.floor(tempTime / 1000)
        tempTime = tempTime % 1000
    }
    // Divide by 10 and floor to keep milliseconds at only 2 digets
    ms = Math.floor(tempTime / 10)
    return [h, m, s, ms]
}
const timeObjToMSFormat = timeObj => {
    let [h, m, s, ms] = timeObj
    let totMS = 0

    totMS += h * 3600000
    totMS += m * 60000
    totMS += s * 1000
    totMS += ms

    return totMS
}

// Format milliseconds into a standard timer format time
const formatTime = time => {
    let [hours, minutes, seconds, milliseconds] = msToTimeObjFormat(time)

    if (window.innerWidth >= 600) {
        return (
            hours +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds) +
            '.' +
            (milliseconds < 10 ? '0' + milliseconds : milliseconds)
        )
    } else {
        if (hours == 0) {
            return (
                (minutes < 10 ? '0' + minutes : minutes) +
                ':' +
                (seconds < 10 ? '0' + seconds : seconds) +
                '.' +
                (milliseconds < 10 ? '0' + milliseconds : milliseconds)
            )
        } else {
            return (
                hours +
                ':' +
                (minutes < 10 ? '0' + minutes : minutes) +
                ':' +
                (seconds < 10 ? '0' + seconds : seconds)
            )
        }
    }
}
window.addEventListener('resize', function () {
    updateTimeTable(timesInfoList)
    if (window.innerWidth >= 600) {
        stopwatchEl.innerText = '0:00:00.00'
    } else {
        stopwatchEl.innerText = '00:00.00'
    }
})

document.addEventListener('keypress', function (event) {
    if (event.keyCode == 32) {
        if (
            !$('input').is(':focus') &&
            !$('textarea').is(':focus') &&
            document.activeElement == document.body
        ) {
            event.preventDefault()
            startStop(!timerIsRunning)
            console.log('here')
        }
    }
})
