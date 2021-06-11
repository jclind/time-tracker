// When Modal Closes
$('#accountModal').on('hidden.bs.modal', () => {
    // Enable Scrolling when modal closes
    document.body.style.overflowY = 'visible'
    document.body.style.height = '100%'

    // Clear input
    tagListModalSearchInput.value = ''

    const changePasswordModalForm = document.querySelector(
        '#accountModal .password-inputs'
    )
    changePasswordModalForm.reset()
    if (!changePasswordModalForm.classList.contains('d-none')) {
        changePasswordModalForm.classList.remove('d-block')
        changePasswordModalForm.classList.add('d-none')
    }
})
