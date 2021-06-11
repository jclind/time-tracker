const deleteTimeItem = key => {
    function deleteTime() {
        // Remove given time item (from key) from timesInfoList
        timesInfoList.splice(timesInfoListElIdx, 1)
        saveUserData()
        // Close modal
        $('#deleteTimePromptModal').modal('hide')
    }
    function closeModal() {
        // Close modal
        $('#deleteTimePromptModal').modal('hide')
    }

    // Get time item index from timesInfoList from key
    const timesInfoListElIdx = timesInfoList.findIndex(time => time.key === key)
    console.log(timesInfoList[timesInfoListElIdx])
    // Show delete time modal prompt
    $('#deleteTimePromptModal').modal('show')

    const deleteBtn = document.querySelector(
        '#deleteTimePromptModal .delete-btn'
    )
    const cancelBtn = document.querySelector(
        '#deleteTimePromptModal .cancel-btn'
    )
    deleteBtn.addEventListener('click', deleteTime)
    cancelBtn.addEventListener('click', closeModal)

    // When Modal Closes
    $('#deleteTimePromptModal').on('hidden.bs.modal', () => {
        // Remove Event Listeners from cancel and delete buttons
        deleteBtn.removeEventListener('click', deleteTime)
        cancelBtn.removeEventListener('click', closeModal)
    })
}
