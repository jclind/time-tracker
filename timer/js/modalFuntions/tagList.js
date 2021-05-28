const tagListModal = document.getElementById('tagListModal')

// setActiveOrEdit will hold the information for weather or not selecting a tag should
// be set as the new active tag, or just to edit a specific old time.
let setActiveOrEdit = undefined

// Set active tag
const activeTagBtn = document.getElementById('activeTagBtn')
activeTagBtn.addEventListener('click', () => {
    $('#tagListModal').modal('show')

    setActiveOrEdit = 'active'
    updateModalTagList(timeTags, false)
})

// Set edited tag
const editTagBtn = document.getElementById('editTagBtn')
editTagBtn.addEventListener('click', () => {
    $('#tagListModal').modal('show')

    setActiveOrEdit = 'edit'
    updateModalTagList(timeTags, false)
})

const tagListModalSearchInput = document.getElementById(
    'tagListModalSearchInput'
)
tagListModalSearchInput.addEventListener('keyup', () => {
    const inputValue = tagListModalSearchInput.value.trim()
    // Update the tags list with inputed string
    tagListModalSearch(inputValue)
})

const tagListModalSearch = inputValue => {
    // set searchArray equal to an array containing all tags with names container user inputed value.
    let searchArray = timeTags.filter(tag => tag.name.includes(inputValue))

    // If the searchArray contains a tag with the exact input as the user input
    // Update the modal tag list without a create new tag btn
    if (searchArray.find(tag => tag.name === inputValue) === undefined) {
        // Update tag List with new searched for array
        updateModalTagList(searchArray, true, inputValue)
    } else {
        // Update tag List with new searched for array
        updateModalTagList(searchArray, false)
    }
}

// Takes array of tags, boolean for if there should be a create new tag btn,
// and the input value of the search input
const updateModalTagList = (tags, isBtn, inputValue) => {
    const modalTagList = document.getElementById('modalTagList')
    // Get the active tag from the timer info tag selector btn text
    const activeTag = timeTags.find(tag => {
        if (setActiveOrEdit === 'active') {
            return (
                tag.name ==
                document.getElementById('activeTimeTagSelectionBtnName')
                    .innerText
            )
        } else {
            return (
                tag.name ==
                document.getElementById('editTimeTagSelectionBtnName').innerText
            )
        }
    })

    modalTagList.innerHTML = ''

    tags.forEach(item => {
        let activeTagHTML = ''
        // If the current tag is the euqal tag, add the check to the tag.
        console.log(item.name, activeTag)
        if (item.name === activeTag.name) {
            modalTagList.innerHTML += `
            <div
                class="tag-item py-3 d-flex align-items-center selected-tag position-relative"
                data-tag-name="${item.name}"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-tag-fill"
                    viewBox="0 0 16 16"
                    style="color: ${item.color}"
                >
                    <path
                        d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    />
                </svg>
                <span class="ml-3 selected-tag-name">${item.name}</span>
                <div class="tag-btns position-absolute">
                    <button class="btn edit-btn mr-2" style="color: #00adb5;" onclick="editTagModal(event, '${item.name}')">Edit</button>
                    <button class="btn delete-btn">Delete</button>
                </div>
            </div>
            `
        } else {
            modalTagList.innerHTML += `
                <div
                    class="tag-item py-3 d-flex align-items-center position-relative"
                    data-tag-name="${item.name}" 
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-tag-fill"
                        viewBox="0 0 16 16"
                        style="color: ${item.color}"
                    >
                        <path
                            d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        />
                    </svg>
                    <span class="ml-3">${item.name}</span>
                    <div class="tag-btns position-absolute">
                        <button class="btn edit-btn mr-2" onclick="editTagModal(event, '${item.name}')">Edit</button>
                        <button class="btn delete-btn">Delete</button>
                    </div>
                </div>
                `
        }
    })

    // If the inputValue is unique from any other tag in the array, then show the create btn array.
    if (isBtn) {
        modalTagList.innerHTML += `
            <button class="btn mt-5 py-2 text-left" 
                id="createNewTagBtn" 
            >Create new tag <strong>${inputValue}</strong>
            </button>
        `

        // Add event listener to the button
        const createNewTagBtn = document.getElementById('createNewTagBtn')
        createNewTagBtn.addEventListener('click', () => {
            $('#createTagModal').modal('show')
            document.getElementById('createNewTagTitleInput').value = inputValue
        })
    }

    // get array of all tag elements shown in modal and add event listener to each one
    let modalItems = document.querySelectorAll('#modalTagList .tag-item')
    modalItems.forEach(el => {
        el.addEventListener('click', () => {
            // set clicked tag as active
            let newActiveTagName = el.dataset.tagName
            selectTag(newActiveTagName)
        })
    })
}

const selectTag = inputTagName => {
    if (setActiveOrEdit === 'active') {
        selectActiveTag(inputTagName)
    } else if (setActiveOrEdit === 'edit') {
        selectEditTag(inputTagName)
    } else {
        console.log('Error selecting setActiveOrEdit function')
    }

    if ($('#tagListModal').is(':visible')) {
        $('#tagListModal').modal('hide')
    }
}

// Controls selecting the active tag for upcoming times
const selectActiveTag = inputTagName => {
    const activeTimeTagSelectionBtnName = document.getElementById(
        'activeTimeTagSelectionBtnName'
    )
    const activeTimeTagSelectionBtnColor = document.getElementById(
        'activeTimeTagSelectionBtnColor'
    )
    let newActiveTag = timeTags.find(tag => tag.name === inputTagName)

    // Set name, color and key of active tag
    activeTimeTagSelectionBtnName.innerText = newActiveTag.name
    activeTimeTagSelectionBtnColor.style.color = newActiveTag.color
    document.getElementById('activeTagBtn').dataset.tagKey = newActiveTag.key
}
// Controls selecting the tag for previous times, editing them.
const selectEditTag = inputTagName => {
    const editTimeTagSelectionBtnName = document.getElementById(
        'editTimeTagSelectionBtnName'
    )
    const editTimeTagSelectionBtnColor = document.getElementById(
        'editTimeTagSelectionBtnColor'
    )
    let newActiveTag = timeTags.find(tag => tag.name === inputTagName)

    // Set name and color of active tag
    editTimeTagSelectionBtnName.innerText = newActiveTag.name
    editTimeTagSelectionBtnColor.style.color = newActiveTag.color
    document.getElementById('editTagBtn').dataset.tagKey = newActiveTag.key
}

// When Modal Opens
$('#tagListModal').on('shown.bs.modal', () => {
    // Disable Scrolling when model opens
    document.body.style.overflowY = 'hidden'
    document.body.style.height = '92vh'
})
// When Modal Closes
$('#tagListModal').on('hidden.bs.modal', () => {
    // Enable Scrolling when modal closes
    document.body.style.overflowY = 'visible'
    document.body.style.height = '100%'

    // Clear input
    tagListModalSearchInput.value = ''
})
// Remove Touch Scrolling functionality from modal element.
document.querySelector('#tagListModal').ontouchmove = function (event) {
    event.preventDefault()
}
