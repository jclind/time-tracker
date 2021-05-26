const showChangePasswordAlert = () => {
    const alert = document.querySelector('#changePasswordAlert')

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        setTimeout(() => {
            alert.classList.add('hide')
        }, 6000)
    }
}

const showIncorrectPasswordAlert = () => {
    const alert = document.querySelector('#incorrectPasswordAlert')

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        console.log('yooo')
        setTimeout(() => {
            alert.classList.add('hide')
        }, 6000)
    }
}
const showPasswordsDontMatchAlert = () => {
    const alert = document.querySelector('#passwordsDontMatchAlert')

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        console.log('yooo3')
        setTimeout(() => {
            alert.classList.add('hide')
        }, 6000)
    }
}
const showMatchingCurrentAndNewPasswordsAlert = () => {
    const alert = document.querySelector('#matchingCurrentAndNewPasswordsAlert')

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        console.log('yooo3')
        setTimeout(() => {
            alert.classList.add('hide')
        }, 6000)
    }
}
const showPasswordNotLongEnoughAlert = () => {
    const alert = document.querySelector('#passwordNotLongEnoughAlert')

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        console.log('yooo3')
        setTimeout(() => {
            alert.classList.add('hide')
        }, 6000)
    }
}

const loginAlertBtn = document.querySelector(
    '#loginToSaveDataAlert .login-alert-btn'
)
loginAlertBtn.addEventListener('click', () => {
    $('#loginModal').modal('show')
})
const signupAlertBtn = document.querySelector(
    '#loginToSaveDataAlert .signup-alert-btn'
)
signupAlertBtn.addEventListener('click', () => {
    $('#signupModal').modal('show ')
})
const showLoginToSaveDataAlert = () => {
    const alert = document.querySelector('#loginToSaveDataAlert')

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        console.log('yooo3')
        setTimeout(() => {
            alert.classList.add('hide')
        }, 6000)
    }
}
