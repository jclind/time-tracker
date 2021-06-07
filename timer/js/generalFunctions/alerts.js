// Hide all modals but the login modal
function showLoginModalFromAlert(id) {
    $('.modal').modal('hide')
    $('#loginModal').modal('show')

    // If the alert is still open, close it
    $('#' + id).slideUp(300, function () {
        $('#' + id).remove()
    })
}
// Hide all modals but the signup modal
function showSignupModalFromAlert(id) {
    $('.modal').modal('hide')
    $('#signupModal').modal('show')

    // If the alert is still open, close it
    $('#' + id).slideUp(300, function () {
        $('#' + id).remove()
    })
}
// Remove alert from the alertContainer from id param
function removeAlert(id) {
    $('#' + id).slideUp(300, function () {
        $('#' + id).remove()
    })
}

/**
 *
 * @param {string} type The alert-type which determines the theme of the alert
 * @param {string} message The text that will be displayed as the alert message
 * @param {boolean} isLoginBtn Weather or not there should be a login btn in the alert
 * @param {boolean} isSignupBtn Weather or not there should be a signup btn in the alert
 * @param {number} time The amount of time (in milliseconds) that the alert will be shown for
 */
const showAlert = (type, message, isLoginBtn, isSignupBtn, time) => {
    // Reference container where alerts will be added and removed
    const alertContainer = document.querySelector('.alerts-container')

    // Get a random unique key for the id of the current alert so that it can later be removed from the html
    let currAlertId = generateKey()

    // If isLoginBtn and isSignupBtn are true, then both buttons will be displayed in the alert
    if (isLoginBtn && isSignupBtn) {
        message += ` 
            <span class="alert-login-btn" onclick="showLoginModalFromAlert('${currAlertId}')">
                <strong style="text-decoration: underline;">Login</strong>
            </span> 
            or 
            <span style="text-decoration: underline;" class="signup-alert-btn" onclick="showSignupModalFromAlert('${currAlertId}')"><strong>Sign Up</strong></span>.
        `
        // If isLoginBtn is true then the login btn will be displayed in the alert
    } else if (isLoginBtn) {
        message += ` 
            <span class="alert-login-btn" onclick="showLoginModalFromAlert('${currAlertId}')">
                <strong style="text-decoration: underline;">Login</strong>.
            </span>
        `
        // If isSignupBtn is true then the signup btn will be displayed in the alert
    } else if (isSignupBtn) {
        message += ` 
            <span style="text-decoration: underline;" class="signup-alert-btn" onclick="showSignupModalFromAlert('${currAlertId}')">
                <strong>Sign Up</strong>.
            </span>
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
