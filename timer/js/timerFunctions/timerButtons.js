// Control timer buttons with animations and styles.
const controlTimerButtons = (isRunning, elapsedTime) => {
    const timeButtonsContainer = document.getElementById('timeButtonsContainer')
    let startStopBtn = document.getElementById('startStopBtn')

    // If timer isn't running and there is no time yet recorded (state 1)
    if (!isRunning && elapsedTime === 0) {
        // Check if either of the other two button classes are on the timeButtonsContainer
        // and if they are remove them.
        if (timeButtonsContainer.classList.contains('buttons-state-2')) {
            timeButtonsContainer.classList.remove('buttons-state-2')
        } else if (timeButtonsContainer.classList.contains('buttons-state-3')) {
            timeButtonsContainer.classList.remove('buttons-state-3')
        }

        // If timeButtonsContainer.classList doesn't contain .buttons-state-1, add it to it's classlist
        if (!timeButtonsContainer.classList.contains('buttons-state-1')) {
            timeButtonsContainer.classList.add('buttons-state-1')
        }

        // Change startStop button text to start
        startStopBtn.innerText = 'Start'
    }
    // If timer isn't running but there is time recorded (state 2)
    else if (!isRunning) {
        // Check if either of the other two button classes are on the timeButtonsContainer
        // and if they are remove them.
        if (timeButtonsContainer.classList.contains('buttons-state-1')) {
            timeButtonsContainer.classList.remove('buttons-state-1')
        } else if (timeButtonsContainer.classList.contains('buttons-state-3')) {
            timeButtonsContainer.classList.remove('buttons-state-3')
        }

        // If timeButtonsContainer.classList doesn't contain .buttons-state-2, add it to it's classlist
        if (!timeButtonsContainer.classList.contains('buttons-state-2')) {
            timeButtonsContainer.classList.add('buttons-state-2')
        }

        // Change startStop button text to start
        startStopBtn.innerText = 'Start'
    }
    // If the timer is running (state 3)
    else {
        // Check if either of the other two button classes are on the timeButtonsContainer
        // and if they are remove them.
        if (timeButtonsContainer.classList.contains('buttons-state-1')) {
            timeButtonsContainer.classList.remove('buttons-state-1')
        } else if (timeButtonsContainer.classList.contains('buttons-state-2')) {
            timeButtonsContainer.classList.remove('buttons-state-2')
        }

        // If timeButtonsContainer.classList doesn't contain .buttons-state-3, add it to it's classlist
        if (!timeButtonsContainer.classList.contains('buttons-state-3')) {
            timeButtonsContainer.classList.add('buttons-state-3')
        }

        // Change startStop button text to Stop
        startStopBtn.innerText = 'Stop'
        console.log('bruh?')
    }
}

// START STOP BUTTON
// Decalare and addeventlistener to start/stop btn
const startStopBtn = document.getElementById('startStopBtn')
startStopBtn.addEventListener('click', startStop) // Calls startStop function from timer.js

// CLAER BUTTON
// Decalare and addeventlistener to clearTimeBtn
const clearBtn = document.getElementById('clearTimeBtn')
clearBtn.addEventListener('click', clearTime) // Calls clearTime function from timer.js
