const showAlert = (type, message, time) => {
    // Reference container where alerts will be added and removed
    const alertContainer = document.querySelector('.alerts-container')

    // Get a random unique key for the id of the current alert so that it can later be removed from the html
    let currAlertId = generateKey()
    if (type == 'success') {
        // Show Success message if type === success
        alertContainer.innerHTML += `
        <div class="alert alert-${type} alert-dismissible fade in" role="alert" id="${currAlertId}">
            <div class="container w-100 h-100 d-flex justify-content-around">
                <span class="message flex-grow-1"><strong>Success!</strong> ${message}.</span>
                <button type="button" class="btn-close btn" onclick="() => {$('#' + ${currAlertId}).remove()}"><i class="fa fa-times" style="font-size: 16px;"></i></button>
            </div>
        </div>
        `
    } else if (type == 'danger') {
        // Show error message if type === danger
        alertContainer.innerHTML += `
        <div class="alert alert-${type} alert-dismissible fade in" role="alert" id="${currAlertId}">
            <div class="container w-100 h-100 d-flex justify-content-around">
                <span class="message flex-grow-1"><strong>Error!</strong> ${message}.</span>
                <button type="button" class="btn-close btn" onclick="() => {$('#' + ${currAlertId}).remove()}"><i class="fa fa-times" style="font-size: 16px;"></i></button>
            </div>
        </div>
        `
    } else {
        // Else just show the message
        alertContainer.innerHTML += `
        <div class="alert alert-${type} alert-dismissible fade in" role="alert" id="functionalAlert${idx}">
                <div class="container w-100 h-100 d-flex justify-content-around">
                    <span class="message flex-grow-1">${message}.</span>
                    <button type="button" class="btn-close btn" onclick="() => {$('#' + ${currAlertId}).remove()}"><i class="fa fa-times" style="font-size: 16px;"></i></button>
                </div>
            </div>
    `
    }

    if (time == null) {
        time = 3000
    }

    setTimeout(() => {
        $('#' + currAlertId).slideUp(300, function () {
            $('#' + currAlertId).remove()
        })
    }, time)
}
