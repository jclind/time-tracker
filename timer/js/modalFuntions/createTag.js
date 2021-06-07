let colorSelectors = document.querySelectorAll('#createTagModal .color')

const createNewTagTitleInput = document.getElementById('createNewTagTitleInput')
const createNewTagColorInput = document.querySelector(
    '#createTagModal .color-select-container'
)
const createTagBtn = document.getElementById('createNewTagBtn')
// Add event listeners to each color seleciton circle
let selectedColor = undefined
colorSelectors.forEach(el => {
    el.addEventListener('click', () => {
        // If there is already a color chosen other than the currently clicked color
        // Remove the check mark from the element that wasn't clicked
        if (
            selectedColor != undefined &&
            selectedColor != el.dataset.tagColor
        ) {
            clearSelectTagColorCheck()
        }
        // Set the selectedColor equal to the clicked color dataset
        selectedColor = el.dataset.tagColor
        let colorCheck = el.querySelector('.color-select')
        if (colorCheck.classList.contains('d-none')) {
            colorCheck.classList.remove('d-none')
        }
        if (createTagBtn.classList.contains('disabled')) {
            createTagBtn.classList.remove('disabled')
        }
    })
})

const clearSelectTagColorCheck = () => {
    // Remove Checkmarks from tag color selector
    colorSelectors.forEach(color => {
        let colorCheck = color.querySelector('.color-select')
        if (!colorCheck.classList.contains('d-none')) {
            colorCheck.classList.add('d-none')
        }
    })
}

createTagBtn.addEventListener('click', () => {
    let isErr = false

    if (createNewTagTitleInput.value.trim() === '') {
        showAlert('danger', 'Tag name must not be empty')
        createNewTagTitleInput.style.border = '2px solid #dc3545'
        createNewTagTitleInput.addEventListener('keypress', function () {
            this.style.border = 'none'
        })
    } else if (
        timeTags.find(el => el.name === createNewTagTitleInput.value.trim()) !=
        undefined
    ) {
        showAlert('danger', 'Tag name is alreaddy in use.')
        createNewTagTitleInput.style.border = '2px solid #dc3545'
        createNewTagTitleInput.addEventListener('keypress', function () {
            this.style.border = 'none'
        })
    } else if (createNewTagTitleInput.value.length > 25) {
        createNewTagTitleInput.style.border = '2px solid #dc3545'
        createNewTagTitleInput.addEventListener('keypress', function () {
            this.style.border = 'none'
        })
        showAlert('danger', 'Tag name must be less than 26 characters')
    } else if (selectedColor === undefined) {
        createNewTagColorInput.style.border = '2px solid #dc3545'
        createNewTagColorInput.addEventListener('click', function () {
            this.style.border = 'none'
        })
        showAlert('danger', 'Color must be selected to create tag.')
    } else {
        const newTag = {
            name: createNewTagTitleInput.value,
            color: selectedColor,
            key: generateKey(),
        }
        timeTags.push(newTag)
        selectTag(newTag.key)
        saveUserData()
        showAlert('success', 'Tag created.')
        $('#createTagModal').modal('hide')
    }
})

// When Modal Opens
$('#createTagModal').on('shown.bs.modal', () => {
    // Disable Scrolling when model opens
    document.body.style.overflowY = 'hidden'
    document.body.style.height = '92vh'
})
// When Modal Closes
$('#createTagModal').on('hidden.bs.modal', () => {
    // Enable Scrolling when modal closes
    document.body.style.overflowY = 'visible'
    document.body.style.height = '100%'
    if (!createTagBtn.classList.contains('disabled')) {
        createTagBtn.classList.add('disabled')
    }

    selectedColor = undefined

    // Clear error inputs
    createTagInputError.innerText = ''
    createTagColorSelectError.innerText = ''
    clearSelectTagColorCheck()
})
// Remove Touch Scrolling functionality from modal element.
document.querySelector('#createTagModal').ontouchmove = function (event) {
    event.preventDefault()
}
