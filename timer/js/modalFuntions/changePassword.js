const changePasswordModalBtn = document.querySelector(
    '#accountModal .change-password-btn'
)
const changePasswordModalForm = document.querySelector(
    '#accountModal .password-inputs'
)
const currentPassword = document.querySelector(
    '#accountModal .current-password'
)
const newPassword = document.querySelector('#accountModal .new-password')
const newPasswordVerified = document.querySelector(
    '#accountModal .new-password-verified'
)

// Add focus and selection to each input when focused on
currentPassword.addEventListener('focus', () => {
    currentPassword.select()
})
newPassword.addEventListener('focus', () => {
    newPassword.select()
})
newPasswordVerified.addEventListener('focus', () => {
    newPasswordVerified.select()
})

changePasswordModalBtn.addEventListener('click', () => {
    // Set all input border's back to normal
    currentPassword.style.border = '1px solid #4f5763'
    newPassword.style.border = '1px solid #4f5763'
    newPasswordVerified.style.border = '1px solid #4f5763'

    // If the password inputs are hidden, show the form when the change password button is clicked
    if (changePasswordModalForm.classList.contains('d-none')) {
        changePasswordModalForm.classList.remove('d-none')
        changePasswordModalForm.classList.add('d-block')
    } else {
        const user = auth.currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword.value
        )
        user.reauthenticateWithCredential(credential)
            .then(() => {
                // If the new passwords do not match
                if (newPassword.value !== newPasswordVerified.value) {
                    showPasswordsDontMatchAlert()
                    newPassword.style.border = '2px solid #dc3545'
                    newPasswordVerified.style.border = '2px solid #dc3545'
                    console.log('Password not matching')
                    // If the current password matches the new password
                } else if (currentPassword.value === newPassword.value) {
                    showMatchingCurrentAndNewPasswordsAlert()
                    currentPassword.style.border = '2px solid #dc3545'
                    newPassword.style.border = '2px solid #dc3545'
                    newPasswordVerified.style.border = '2px solid #dc3545'
                    console.log('Password matches')
                    // If the new password length is less than 8 characters
                } else if (newPassword.value.length < 8) {
                    showPasswordNotLongEnoughAlert()
                    newPassword.style.border = '2px solid #dc3545'
                    newPasswordVerified.style.border = '2px solid #dc3545'
                    console.log('Password not long enough')
                } else {
                    auth.currentUser
                        .updatePassword(newPassword.value)
                        .then(() => {
                            console.log('Password Changed!')
                            changePasswordModalForm.classList.remove('d-block')
                            changePasswordModalForm.classList.add('d-none')

                            changePasswordModalForm.reset()
                            showChangePasswordAlert()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                showIncorrectPasswordAlert()
                currentPassword.style.border = '2px solid #dc3545'
                console.log('Password not correct')
            })
    }
})

const showPasswordBtns = document.querySelectorAll('#accountModal .eye')
showPasswordBtns.forEach(el =>
    el.addEventListener('click', function () {
        this.querySelector('.hide-password').classList.toggle('d-none')
        this.querySelector('.show-password').classList.toggle('d-none')
        if (this.querySelector('.hide-password').classList.contains('d-none')) {
            this.parentElement.querySelector('input').type = 'password'
        } else {
            this.parentElement.querySelector('input').type = 'text'
        }
    })
)
