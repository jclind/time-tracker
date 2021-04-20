$(document).ready(() => {
    let lastTimesInfoEl = timesInfoList[timesInfoList.length - 1]
    // Change tag button name to last submitted tag name
    document.getElementById('activeTimeTagSelectionBtnName').innerText =
        lastTimesInfoEl.tag.name
    document.getElementById('activeTimeTagSelectionBtnColor').style.color =
        lastTimesInfoEl.tag.color
})
