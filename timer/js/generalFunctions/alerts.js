// Hide all modals but the login modal
function showLoginModalFromAlert() {
    $('.modal').modal('hide')
    $('#loginModal').modal('show')

    // If the alert is still open, close it
}
// Hide all modals but the signup modal
function showSignupModalFromAlert() {
    $('.modal').modal('hide')
    $('#signupModal').modal('show')
}
function removeAlert(id) {
    console.log(id)
    $('#' + id).slideUp(300, function () {
        $('#' + id).remove()
    })
}

/**
 * Dynamically adds and removes alerts to the alert container element
 * @param {string} type The type of alert that will be shown on the webpage
 * @param {string} message The text that will be displayed as the alert message
 * @param {number} time The amount of time (in milliseconds) that the alert will be shown for
 */

const showAlert = (type, message, isLoginBtn, isSignupBtn, time) => {
    // Reference container where alerts will be added and removed
    const alertContainer = document.querySelector('.alerts-container')

    // Get a random unique key for the id of the current alert so that it can later be removed from the html
    let currAlertId = generateKey()

    if (isLoginBtn && isSignupBtn) {
        message += ` <span class="alert-login-btn" onclick="showLoginModalFromAlert(${currAlertId})">
            <strong style="text-decoration: underline;">Login</strong>
            </span> 
            or 
            <span style="text-decoration: underline;" class="signup-alert-btn" onclick="showSignupModalFromAlert(${currAlertId})"><strong>Sign Up</strong></span>.
        `
    }
    console.log(currAlertId)
    if (type == 'success') {
        // Show Success message if type === success
        alertContainer.innerHTML += `
        <div class="alert alert-${type} alert-dismissible fade in" role="alert" id="${currAlertId}">
            <div class="container w-100 h-100 d-flex justify-content-around">
                <span class="message flex-grow-1"><strong>Success!</strong> ${message}</span>
                <button type="button" class="btn-close btn" onclick="removeAlert('${currAlertId}')"><i class="fa fa-times" style="font-size: 16px;"></i></button>
            </div>
        </div>
        `
    } else if (type == 'danger') {
        // Show error message if type === danger
        alertContainer.innerHTML += `
        <div class="alert alert-${type} alert-dismissible fade in" role="alert" id="${currAlertId}">
            <div class="container w-100 h-100 d-flex justify-content-around">
                <span class="message flex-grow-1"><strong>Error!</strong> ${message}</span>
                <button type="button" class="btn-close btn" onclick="removeAlert('${currAlertId}')"><i class="fa fa-times" style="font-size: 16px;"></i></button>
            </div>
        </div>
        `
    } else {
        // Else just show the message
        alertContainer.innerHTML += `
        <div class="alert alert-${type} alert-dismissible fade in" role="alert" id="functionalAlert${idx}">
                <div class="container w-100 h-100 d-flex justify-content-around">
                    <span class="message flex-grow-1">${message}</span>
                    <button type="button" class="btn-close btn" onclick="removeAlert('${currAlertId}')"><i class="fa fa-times" style="font-size: 16px;"></i></button>
                </div>
            </div>
    `
    }

    // If no time value was given, set time to 3 seconds
    if (time == null) {
        time = 3000
    }

    // Removes current alert from the alert container after a given amount of time
    setTimeout(() => {
        if ($('#' + currAlertId)) {
            removeAlert(currAlertId)
        }
    }, time)
}
