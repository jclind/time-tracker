const submitTime = (time, currStartingTime, currFinishedTime) => {
    // Get Tag
    const tag = timeTags.find(tag => {
        let tempTagName = document.getElementById(
            'activeTimeTagSelectionBtnName'
        ).innerText
        return tag.name === tempTagName
    })

    // Get Name
    const timeNameInput = document.getElementById('timeNameInput')
    // If there is no value in the time title input then just set the title to the active tag name
    const timeName =
        timeNameInput.value.trim() === ''
            ? tag.name
            : timeNameInput.value.trim()

    // Get Description
    const descriptionInput = document.getElementById('timeDescriptionInput')
    const description = descriptionInput.value.trim()
    let tempObj = {
        name: timeName,
        time: time,
        date: currStartingTime.toString(),
        tag: tag,
        startTime: currStartingTime.toString(),
        finishTime: currFinishedTime.toString(),
        description: description,
        key: generateKey(),
    }
    timesInfoList.push(tempObj)

    // Clear Inputs on submit
    timeNameInput.value = ''
    descriptionInput.value = ''
    clearTime()
    saveUserData()
}

const submitTimeBtn = document.getElementById('submitTimeBtn')
submitTimeBtn.addEventListener('click', () =>
    submitTime(elapsedTime, currStartingTime, currFinishedTime)
)
