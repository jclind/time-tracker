const deleteTag = (event, tagKey) => {
    event.stopPropagation()

    // Show deleteTagPrompt modal
    $('#deleteTagPromptModal').modal('show')

    console.log(timeTags.find(el => el.key === tagKey))

    function deleteTag() {
        // Remove given tag from timeTags array
        let tagIdx = timeTags.findIndex(el => el.key === tagKey)
        timeTags.splice(tagIdx, 1)
        // Search through timesInfoList for any times with selected tag to be deleted and replace them with the first tag in the tag list
        timesInfoList.forEach((el, index) => {
            if (el.tagKey === tagKey) {
                timesInfoList[index].tagKey === timeTags[0].key
            }
        })
        updateModalTagList(timeTags)
        saveUserData()

        // Close modal
        $('#deleteTagPromptModal').modal('hide')
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
    deleteBtn.addEventListener('click', deleteTag)
    cancelBtn.addEventListener('click', closeModal)

    // When Modal Closes
    $('#deleteTagPromptModal').on('hidden.bs.modal', () => {
        // Remove Event Listeners from cancel and delete buttons
        deleteBtn.removeEventListener('click', deleteTag)
        cancelBtn.removeEventListener('click', closeModal)
    })
}
