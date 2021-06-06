const showAlert = (type, message, time) => {
    const alert = document.querySelector('#functionalAlert')
    const alertMessage = alert.querySelector('.message')
    // Add type of alert class to the alert element
    alert.classList.add(`alert-${type}`)

    if (type == 'success') {
        alertMessage.innerHTML = `
            <strong>Success!</strong> ${message}.
        `
    } else if (type == 'danger') {
        alertMessage.innerHTML = `
            <strong>Error!</strong> ${message}.
        `
    } else {
        alertMessage.innerHTML = `${message}.`
    }

    // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
    if (alert.classList.contains('hide')) {
        alert.classList.remove('hide')
        setTimeout(() => {
            // alert.classList.add('hide')
            alert.slideUp(500, function () {
                $(alert).remove()
            })
        }, 3000)
    }
    // $(alert).on('close.bs.alert', function (e) {
    //     // stop Bootstrap animation
    //     e.stopPropagation()

    //     // Use my own animation
    //     $(this).closest('.alert').animate({
    //         height: 'toggle',
    //         opacity: 'toggle',
    //     })
    // })
}

// const showChangePasswordAlert = () => {
//     const alert = document.querySelector('#changePasswordAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 6000)
//     }
// }

// const showIncorrectPasswordAlert = () => {
//     const alert = document.querySelector('#incorrectPasswordAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 3000)
//     }
// }
// const showUserNotFoundAlert = () => {
//     const alert = document.querySelector('#userNotFoundAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 3000)
//     }
// }
// const showNetworkProblemsAlert = () => {
//     const alert = document.querySelector('#networkProblemsAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 2000)
//     }
// }
// const showBackOnlineAlert = () => {
//     const alert = document.querySelector('#backOnlineAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 2000)
//     }
// }
// const showSomethingWentWrongAlert = () => {
//     const alert = document.querySelector('#somethingWentWrongAlert')
//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 3000)
//     }
// }
// const showTagNameMustNotBeEmptyAlert = () => {
//     const alert = document.querySelector('#tagNameMustNotBeEmptyAlert')
//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 3000)
//     }
// }
// const showTagNameAlreadyTakenAlert = () => {
//     const alert = document.querySelector('#tagNameAlreadyTakenAlert')
//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 3000)
//     }
// }
// const showEmailAlreadyInUseAlert = () => {
//     const alert = document.querySelector('#emailAlreadyInUseAlert')
//     // Add event listener to the login btn to hide signup modal and show login modal
//     document
//         .querySelector('#emailAlreadyInUseAlert .alert-login-btn')
//         .addEventListener('click', () => {
//             $('#loginModal').modal('show')
//             $('#signupModal').modal('hide')
//             alert.classList.add('hide')
//         })
//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             if (!alert.classList.contains('hide')) {
//                 alert.classList.add('hide')
//             }
//         }, 4000)
//     }
// }
// const showPasswordsDontMatchAlert = () => {
//     const alert = document.querySelector('#passwordsDontMatchAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 6000)
//     }
// }
// const showMatchingCurrentAndNewPasswordsAlert = () => {
//     const alert = document.querySelector('#matchingCurrentAndNewPasswordsAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 6000)
//     }
// }
// const showPasswordNotLongEnoughAlert = () => {
//     const alert = document.querySelector('#passwordNotLongEnoughAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 6000)
//     }
// }
// const showChangesSavedAlert = () => {
//     const alert = document.querySelector('#changesSavedAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 3000)
//     }
// }

// const loginAlertBtn = document.querySelector(
//     '#loginToSaveDataAlert .login-alert-btn'
// )
// loginAlertBtn.addEventListener('click', () => {
//     $('#loginModal').modal('show')
// })
// const signupAlertBtn = document.querySelector(
//     '#loginToSaveDataAlert .signup-alert-btn'
// )
// signupAlertBtn.addEventListener('click', () => {
//     $('#signupModal').modal('show')
// })
// const showLoginToSaveDataAlert = () => {
//     const alert = document.querySelector('#loginToSaveDataAlert')

//     // To ensure that the interval is not called more than once at a time, first check if the alert is hidden
//     if (alert.classList.contains('hide')) {
//         alert.classList.remove('hide')
//         console.log('yooo3')
//         setTimeout(() => {
//             alert.classList.add('hide')
//         }, 15000)
//     }
// }
