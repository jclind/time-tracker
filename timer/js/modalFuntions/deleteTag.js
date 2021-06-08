const deleteTag = (event, tagKey) => {
    event.stopPropagation()

    // Show deleteTagPrompt modal
    $('#deleteTagPromptModal').modal('show')

    function removeTag() {
        // If there's more than one tag, then it will be deleted
        // If there is only one tag, prevent user from deleting it
        if (timeTags.length > 1) {
            // Get the active tag key from the activeTagBtn element dataset
            const activeTagKey = activeTagBtn.dataset.tagKey
            // Remove given tag from timeTags array
            let tagIdx = timeTags.findIndex(el => el.key === tagKey)
            let selectedTagKey = activeTagBtn.dataset.tagKey
            timeTags.splice(tagIdx, 1)

            if (activeTagKey === selectedTagKey) {
                selectActiveTag(timeTags[0].key)
            }
            // Search through timesInfoList for any times with selected tag to be deleted and replace them with the first tag in the tag list
            timesInfoList.forEach((el, index) => {
                if (el.tagKey === tagKey) {
                    timesInfoList[index].tagKey = timeTags[0].key
                }
            })
            updateModalTagList(timeTags)
            saveUserData()
            showAlert('success', 'Tag has been deleted.')

            // Close modal
            $('#deleteTagPromptModal').modal('hide')
        } else {
            showAlert('danger', 'Must have at least one tag.')
        }
    }
    function closeModal() {
        // Close modal
        $('#deleteTagPromptModal').modal('hide')
    }

    // Show delete time modal prompt
    $('#deleteTagPromptModal').modal('show')

    const deleteBtn = document.querySelector(
        '#deleteTagPromptModal .delete-btn'
    )
    const cancelBtn = document.querySelector(
        '#deleteTagPromptModal .cancel-btn'
    )
    deleteBtn.addEventListener('click', removeTag)
    cancelBtn.addEventListener('click', closeModal)

    // When Modal Closes
    $('#deleteTagPromptModal').on('hidden.bs.modal', () => {
        // Remove Event Listeners from cancel and delete buttons
        deleteBtn.removeEventListener('click', deleteTag)
        cancelBtn.removeEventListener('click', closeModal)
    })
}
