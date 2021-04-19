// !! ADD FUNCTIONALITY

// When Modal Opens
$('#editTimeModal').on('shown.bs.modal', () => {
    // Disable Scrolling when model opens
    document.body.style.overflowY = 'hidden'
    document.body.style.height = '92vh'
})
// When Modal Closes
$('#editTimeModal').on('hidden.bs.modal', () => {
    // Enable Scrolling when modal closes
    document.body.style.overflowY = 'visible'
    document.body.style.height = '100%'
})
// Remove Touch Scrolling functionality from modal element.
document.querySelector('#editTimeModal').ontouchmove = function (event) {
    event.preventDefault()
}
