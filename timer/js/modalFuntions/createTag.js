let colorSelectors = document.querySelectorAll('#createTagModal .color')
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

const createNewTagTitleInput = document.getElementById('createNewTagTitleInput')

const createTagInputError = document.getElementById('createTagInputError')
const createTagColorSelectError = document.getElementById(
    'createTagColorSelectError'
)
const createTagBtn = document.getElementById('createNewTagBtn')

createTagBtn.addEventListener('click', () => {
    let isErr = false

    if (createNewTagTitleInput.value.trim() === '') {
        createTagInputError.innerText = 'Please Enter Valid Name.'

        isErr = true
    } else if (
        timeTags.find(el => el.name === createNewTagTitleInput.value.trim()) !=
        undefined
    ) {
        createTagInputError.innerText = 'Tag Name Already In Use.'

        isErr = true
    }

    if (selectedColor === undefined) {
        createTagColorSelectError.innerText = 'Please Select A Tag Color'

        isErr = true
    }

    if (!isErr) {
        const newTag = {
            name: createNewTagTitleInput.value,
            color: selectedColor,
            key: generateKey(),
        }
        timeTags.push(newTag)
        selectTag(newTag.name)
        saveUserData()
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

    // Clear error inputs
    createTagInputError.innerText = ''
    createTagColorSelectError.innerText = ''
    clearSelectTagColorCheck()
})
// Remove Touch Scrolling functionality from modal element.
document.querySelector('#createTagModal').ontouchmove = function (event) {
    event.preventDefault()
}
