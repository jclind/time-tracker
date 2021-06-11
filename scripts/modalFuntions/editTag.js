const editTagColorSelectors = document.querySelectorAll('#editTagModal .color')
const editTagModal = (event, tagKey) => {
    event.stopPropagation()
    console.log(tagKey)
    let tagEl = timeTags.find(el => el.key === tagKey)
    console.log(tagEl)
    // Show modal
    $('#editTagModal').modal('show')
    // Reference name input and set it to the selected tag name
    const nameInput = document.querySelector('#editTagTitleInput')
    nameInput.value = tagEl.name

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
        if (nameInput.value.trim() === '') {
            showAlert('danger', 'Tag name cannot be empty.')
        } else if (nameInput.value.trim().length > 25) {
            showAlert(
                'danger',
                'Tag name must be less than 26 characters long.'
            )
        } else if (timeTags.find(el => el.name === nameInput.value.trim())) {
            showAlert('danger', 'Tag name already exists.')
        } else {
            if (
                tagEl.name !== nameInput.value ||
                tagEl.color !== selectedColor
            ) {
                tagEl.name = nameInput.value.trim()
                tagEl.color = selectedColor
                updateModalTagList(timeTags)
                saveUserData()
            }
            showAlert('success', 'Your changes have been saved.')
            // Clost Modal
            $('#editTagModal').modal('hide')
        }
    }

    const cancelBtn = document.querySelector('#editTagModal .cancel-btn')
    const editBtn = document.querySelector('#editTagModal .edit-btn')

    cancelBtn.addEventListener('click', closeModal)
    editBtn.addEventListener('click', editTag)

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

        cancelBtn.removeEventListener('click', closeModal)
        editBtn.removeEventListener('click', editTag)

        // Clear error inputs
        // createTagInputError.innerText = ''
        // createTagColorSelectError.innerText = ''

        clearSelectEditTagColorCheck()
    })
}
