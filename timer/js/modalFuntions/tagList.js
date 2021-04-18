const tagListModal = document.getElementById('tagListModal')

$('#tagListModal').on('shown.bs.modal', () => {
    // Disable Scrolling when model opens
    document.body.style.overflowY = 'hidden'
    document.body.style.height = '92vh'

    updateModalTagList(timeTags, false)
})
// Enable Scrolling when modal closes
$('#tagListModal').on('hidden.bs.modal', () => {
    document.body.style.overflowY = 'visible'
    document.body.style.height = '100%'
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

const updateModalTagList = (tags, isBtn, inputValue) => {
    const modalTagList = document.getElementById('modalTagList')
    // Get the active tag from the timer info tag selector btn text
    const activeTag = timeTags.find(tag => {
        return (tag.name = document.getElementById(
            'timeTagSelectionBtnName'
        ).innerText)
    })

    modalTagList.innerHTML = ''

    tags.forEach(item => {
        let activeTagHTML = ''

        // If the current tag is the euqal tag, add the check to the tag.
        if (item.name === activeTag.name) {
            activeTagHTML = `
                <div class="selected-tag">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        class="bi bi-check"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                        />
                    </svg>
                </div>
            `
        }

        modalTagList.innerHTML += `
            <div
                class="tag-item py-3 d-flex align-items-center"
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
                ${activeTagHTML}
            </div>
            `
    })

    // If the inputValue is unique from any other tag in the array, then show the create btn array.
    if (isBtn) {
        modalTagList.innerHTML += `
            <button class="btn mt-5 py-2 text-left" id="createNewTagBtn">Create new tag <strong>${inputValue}</strong></button>
        `
    }

    // get array of all tag elements shown in modal and add event listener to each one
    let modalItems = document.querySelectorAll('#modalTagList .tag-item')
    modalItems.forEach(el => {
        el.addEventListener('click', () => {
            // set clicked tag as active
            let newActiveTagName = el.dataset.tagName
            selectActiveTag(newActiveTagName)
            $('#tagListModal').modal('hide')
        })
    })
}

const selectActiveTag = inputTagName => {
    const timeTagSelectionBtnName = document.getElementById(
        'timeTagSelectionBtnName'
    )
    const timeTagSelecitonBtnColor = document.getElementById(
        'timeTagSelecitonBtnColor'
    )

    let newActiveTag = timeTags.find(tag => tag.name === inputTagName)

    // Set name and color of active tag
    timeTagSelectionBtnName.innerText = newActiveTag.name
    // !! FIX COLOR OPERATION
    timeTagSelecitonBtnColor.style.color = newActiveTag.color
}

// Remove Touch Scrolling functionality from modal element.
document.querySelector('#tagListModal').ontouchmove = function (event) {
    event.preventDefault()
}
