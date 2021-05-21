const showEditTimeModal = key => {
    $('#editTimeModal').modal('show')

    const tagNameEl = document.getElementById('editTimeTagSelectionBtnName')
    const tagColorEl = document.getElementById('editTimeTagSelectionBtnColor')
    const nameInput = document.getElementById('modalEditTitleInput')
    const descriptionInput = document.getElementById(
        'modalEditDescriptionInput'
    )

    // Get selected time element index from timesInfoList with key
    let timeIdx = timesInfoList.findIndex(time => time.key === key)
    let timeObj = timesInfoList[timeIdx]

    // Edit time tag selector
    tagNameEl.innerText = timeObj.tag.name
    tagColorEl.style.color = timeObj.tag.color
    // Edit time name input
    nameInput.value = timeObj.name
    // Edit time change time inputs, call the editTimeModalTimeInput to format and change each input placeholder value
    editTimeModalTimeInput(timeObj.time)
    // Edit time description
    descriptionInput.value = timeObj.description

    const submitEditModal = timeObj => {}

    // On Edit button click
    $('#submitEditModalBtn').on('click', () => {
        // submitEditModal(timeObj)
        let currTimeIdx = timesInfoList.findIndex(time => time.key === key)
        let currTimeObj = timesInfoList[currTimeIdx]

        console.log(currTimeObj)
        // if isChanged is set to true, data will be saved
        let isChanged = false

        // If tag name doesn't match the original time title, then it will be updated.
        if (tagNameEl.innerText !== currTimeObj.tag.name) {
            // Search through tag's array and switch the old tag with the new tag in the timeObj
            currTimeObj.tag = timeTags.find(
                tag => tag.name === tagNameEl.innerText
            )
            isChanged = true
        }

        if (nameInput.value !== currTimeObj.name) {
            currTimeObj.name = nameInput.value
            isChanged = true
        }

        if (editTimeModalInputIsChanged(currTimeObj.time) !== undefined) {
            currTimeObj.time = editTimeModalInputIsChanged(currTimeObj.time)
            isChanged = true
        }

        if (descriptionInput.value !== currTimeObj.description) {
            currTimeObj.description = descriptionInput.value
            isChanged = true
        }

        $('#editTimeModal').modal('hide')
        updateTimeTable(timesInfoList)
        $('#submitEditModalBtn').off('click')
    })
}

// When Modal Opens
$('#editTimeModal').on('shown.bs.modal', () => {
    // Disable Scrolling when model opens
    document.body.style.overflowY = 'hidden'
    document.body.style.height = '92vh'
})
// When Modal Closes
$('#editTimeModal').on('hidden.bs.modal', () => {
    // Enable Scrolling when modal closes
    document.body.style.overflowY = 'visible'
    document.body.style.height = '100%'
})
// Remove Touch Scrolling functionality from modal element.
document.querySelector('#editTimeModal').ontouchmove = function (event) {
    event.preventDefault()
}
