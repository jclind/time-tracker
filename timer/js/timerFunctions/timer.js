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

let currStartingTime = null
let currFinishedTime = null

// Control functionality and loop of the timer element
const startStop = () => {
    // Get time element that holds the actual counting time
    let timeEl = document.getElementById('time')

    // Get inner text of start stop button
    let startStopElText = document.getElementById('startStopBtn').innerText

    // If the timer is not runing.
    if (startStopElText === 'START') {
        // Set timerIsRunning to true when the interval starts running the timer
        timerIsRunning = true

        // If the timer is at 0, then set the 'currStartingTime' to the current date/time
        if (timeEl.innerText == '00:00.00') {
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

// Format milliseconds into a standard timer format time
const formatTime = time => {
    let tempTime = time
    let hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0

    // Calculate hours, minutes, seconds, and milliseconds from tempTime in milliseconds
    if (tempTime >= 3600000) {
        hours = Math.floor(tempTime / 3600000)
        tempTime = tempTime % 3600000
    }
    if (tempTime >= 60000) {
        minutes = Math.floor(tempTime / 60000)
        tempTime = tempTime % 60000
    }
    if (tempTime >= 1000) {
        seconds = Math.floor(tempTime / 1000)
        tempTime = tempTime % 1000
    }
    // Divide by 10 and floor to keep milliseconds at only 2 digets
    milliseconds = Math.floor(tempTime / 10)

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