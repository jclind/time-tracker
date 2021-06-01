// !!Write
const saveUserData = () => {
    let currUser = firebase.auth().currentUser
    updateTimeTable(timesInfoList)
    if (currUser) {
        console.log('data saved')
        db.collection('users')
            .doc(currUser.uid)
            .get()
            .then(doc => {
                db.collection('users').doc(currUser.uid).update({
                    timesInfoList: timesInfoList,
                    timeTags: timeTags,
                })
            })
    } else {
        showLoginToSaveDataAlert()
    }
}

window.onload = function (event) {
    if (localStorage.getItem('userTime') !== null) {
        let userTimeArr = JSON.parse(localStorage.getItem('userTime'))
        elapsedTime =
            userTimeArr[0].elapsedTime + Date.now() - userTimeArr[0].startTime
        currStartingTime = new Date(userTimeArr[0].currStartingTime)

        document.querySelector('#timeNameInput').value = userTimeArr[0].title
        document.querySelector('#timeDescriptionInput').value =
            userTimeArr[0].description

        timerIsRunning = userTimeArr[0].timerIsRunning
        // if (userTimeArr[0].timerIsRunning === true) {
        console.log('why am I here?')(timerIsRunning)
        // }
        localStorage.removeItem('userTime')
    }
}

window.onunload = window.onbeforeunload = function (event) {
    if (timerIsRunning) {
        const title = document.querySelector('#timeNameInput').value
        const description = document.querySelector(
            '#timeDescriptionInput'
        ).value
        let userTimeArr = [
            {
                title: title,
                description: description,
                currSartingTime: currStartingTime,
                startTime: Date.now(),
                elapsedTime: elapsedTime,
                timerIsRunning: timerIsRunning,
            },
        ]
        localStorage.setItem('userTime', JSON.stringify(userTimeArr))
    } else if (!timerIsRunning && elapsedTime !== 0) {
        return 'Dude, are you sure you want to leave? Think of the kittens!'
    }
}
