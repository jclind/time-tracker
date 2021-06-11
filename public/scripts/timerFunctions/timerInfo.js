$(document).ready(() => {
    let lastTimesInfoEl = timesInfoList[timesInfoList.length - 1]
    // Check if timeTags is empty before using accessing it's data
    if (timeTags.length === 0) {
        timeTags = [
            { name: 'Main', color: '#fd483f', key: generateKey() },
            { name: 'School', color: '#f5df4f', key: generateKey() },
            { name: 'Work', color: '#3d3d90', key: generateKey() },
            { name: 'Exersice', color: '#b36b0e', key: generateKey() },
            { name: 'Chores', color: '#694214', key: generateKey() },
            { name: 'Projects', color: '#0a724f', key: generateKey() },
        ]
    }
    // If timesInfoList isn't empty, change tag button name to last submitted tag name
    if (timesInfoList.length > 0) {
        document.getElementById('activeTimeTagSelectionBtnName').innerText =
            lastTimesInfoEl.tag.name
        document.getElementById('activeTimeTagSelectionBtnColor').style.color =
            lastTimesInfoEl.tag.color
    } else {
        // Set active tag to the first tag in the timeTags array
        document.getElementById('activeTimeTagSelectionBtnName').innerText =
            timeTags[0].name
        document.getElementById('activeTimeTagSelectionBtnColor').style.color =
            timeTags[0].color
    }
})
