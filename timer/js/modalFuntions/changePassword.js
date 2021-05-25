const changePasswordModalBtn = document.querySelector(
    '#accountModal .change-password-btn'
)
const changePasswordModalForm = document.querySelector(
    '#accountModal .password-inputs'
)
changePasswordModalBtn.addEventListener('click', () => {
    if (changePasswordModalForm.classList.contains('d-none')) {
        changePasswordModalForm.classList.remove('d-none')
        changePasswordModalForm.classList.add('d-block')
    } else {
        const currentPassword = document.querySelector(
            '#accountModal .current-password'
        ).value
        const newPassword = document.querySelector(
            '#accountModal .new-password'
        ).value
        const newPasswordVerified = document.querySelector(
            '#accountModal .new-password-verified'
        ).value
        if (currentPassword === newPassword) {
            console.log('New Password must be different from old password')
        } else if (newPassword !== newPasswordVerified) {
            console.log('New passwords must match!')
        } else {
            const user = auth.currentUser
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                currentPassword
            )
            user.reauthenticateWithCredential(credential).then(() => {
                auth.currentUser.updatePassword(newPassword).then(() => {
                    console.log('Password Changed!')
                    changePasswordModalForm.classList.remove('d-block')
                    changePasswordModalForm.classList.add('d-none')

                    changePasswordModalForm.reset()
                })
            })
        }
    }
})
