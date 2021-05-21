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
    // Edit time change time inputs
    editTimeModalTimeInput(timeObj.time)
    // Edit time description
    descriptionInput.value = timeObj.description

    // On Edit button click
    $('#submitEditModalBtn').on('click', () => {
        if (tagNameEl.innerText !== timeObj.tag.name) {
            timeObj.tag = timeTags.find(tag => tag.name === tagNameEl.innerText)
        }

        if (descriptionInput.value !== timeObj.description) {
            timeObj.description = descriptionInput.value
        }
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
