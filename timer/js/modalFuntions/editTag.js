const editTagColorSelectors = document.querySelectorAll('#editTagModal .color')
function editTagModal(event, tagName) {
    event.stopPropagation()
    let tagEl = timeTags.find(el => el.name === tagName)
    // Show modal
    $('#editTagModal').modal('show')
    // Reference name input and set it to the selected tag name
    const nameInput = document.querySelector('#editTagTitleInput')
    nameInput.value = tagName

    // Add event listeners to each color seleciton circle
    let selectedColor = tagEl.color

    // Select selected tag color
    editTagColorSelectors.forEach(el => {
        if (el.dataset.tagColor === selectedColor) {
            el.querySelector('.color-select').classList.remove('d-none')
        }
        el.addEventListener('click', () => {
            // If there is already a color chosen other than the currently clicked color
            // Remove the check mark from the element that wasn't clicked
            if (
                selectedColor != undefined &&
                selectedColor != el.dataset.tagColor
            ) {
                clearSelectEditTagColorCheck()
            }
            // Set the selectedColor equal to the clicked color dataset
            selectedColor = el.dataset.tagColor
            let colorCheck = el.querySelector('.color-select')
            if (colorCheck.classList.contains('d-none')) {
                colorCheck.classList.remove('d-none')
            }
        })
    })

    function closeModal() {
        $('#editTagModal').modal('hide')
    }
    function editTag() {
        if (tagEl.name !== nameInput.value || tagEl.color !== selectedColor) {
            timesInfoList.forEach((el, idx) => {
                if (el.tag.name === tagEl.name) {
                    timesInfoList[idx].tag.name === nameInput.value
                    timesInfoList[idx].tag.color === selectedColor
                }
            })
            tagEl.name = nameInput.value
            tagEl.color = selectedColor
            console.log(timeTags)
            updateModalTagList(timeTags)
            saveUserData()
        }
    }

    const cancelBtn = document.querySelector('#editTagModal .cancel-btn')
    const editBtn = document.querySelector('#editTagModal .edit-btn')

    cancelBtn.addEventListener('click', closeModal)
    editBtn.addEventListener('click', editTag)
}

const clearSelectEditTagColorCheck = () => {
    // Remove Checkmarks from tag color selector
    editTagColorSelectors.forEach(color => {
        let colorCheck = color.querySelector('.color-select')
        if (!colorCheck.classList.contains('d-none')) {
            colorCheck.classList.add('d-none')
        }
    })
}
// When Modal Closes
$('#editTagModal').on('hidden.bs.modal', () => {
    // Enable Scrolling when modal closes
    // document.body.style.overflowY = 'visible'
    // document.body.style.height = '100%'

    // Clear error inputs
    // createTagInputError.innerText = ''
    // createTagColorSelectError.innerText = ''

    clearSelectEditTagColorCheck()
})
