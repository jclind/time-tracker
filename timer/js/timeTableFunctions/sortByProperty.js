const activePropertyEl = document.getElementById('activePropertyFilter')
const activePropertyElIcon = document.querySelector(
    '#sortByOrderDropdown .sort-by-order .dropdown-icon'
)
const properyDropdownBox = document.getElementById('properyDropdownBox')

// Add click event listener to the active property selected
activePropertyEl.addEventListener('click', () => {
    togglePropertyDropdownBox()
})

// Add click event to each element in dropdown list
let propertyDropdownEls = document.querySelectorAll(
    '#properyDropdownBox .dropdown-selection'
)
propertyDropdownEls.forEach(el =>
    el.addEventListener('click', () => {
        selectNewActiveProperty(el)
    })
)

const selectNewActiveProperty = newEl => {
    let newProp = newEl.innerText
    let oldProp = activePropertyEl.querySelector('.active-filter').innerText

    newEl.innerText = oldProp
    activePropertyEl.querySelector('.active-filter').innerText = newProp

    closePropertyDropdownBox()
}

const togglePropertyDropdownBox = () => {
    // If the dropdown box is hidden, show it
    if (properyDropdownBox.classList.contains('d-none')) {
        openPropertyDropdownBox()
    } else {
        closePropertyDropdownBox()
    }
}
const openPropertyDropdownBox = () => {
    // Change dropdown icon
    activePropertyElIcon.classList.remove('fa-angle-up')
    activePropertyElIcon.classList.add('fa-angle-down')

    // Show dropdown box
    properyDropdownBox.classList.remove('d-none')
    properyDropdownBox.classList.add('d-flex')
}
const closePropertyDropdownBox = () => {
    // Change dropdown icon
    activePropertyElIcon.classList.remove('fa-angle-down')
    activePropertyElIcon.classList.add('fa-angle-up')

    // Hide dropdown box
    properyDropdownBox.classList.remove('d-flex')
    properyDropdownBox.classList.add('d-none')
}

// Close dropdown box if you click outside of the element
$(window).click(function () {
    if (properyDropdownBox.classList.contains('d-flex')) {
        closePropertyDropdownBox()
    }
})
// Prevent propagation so that the sortByOrderDropdown element
// won't set off closePorpertyDropdownBox
$('#sortByOrderDropdown').click(function (event) {
    event.stopPropagation()
})
