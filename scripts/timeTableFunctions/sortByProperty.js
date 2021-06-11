const activePropertyEl = document.getElementById('activePropertyFilter')
const activePropertyElText = activePropertyEl.querySelector('.active-filter')
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
    let oldProp = activePropertyElText.innerText

    newEl.innerText = oldProp
    activePropertyElText.innerText = newProp

    closePropertyDropdownBox()
    updateTimeTable(timesInfoList)
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

const sortByProperty = arr => {
    let sortedArr
    let activeProperty = activePropertyElText.innerText

    if (activeProperty === 'Date') sortedArr = sortByDate(arr)
    else if (activeProperty === 'Time') sortedArr = sortByTime(arr)
    else if (activeProperty === 'Tag') sortedArr = sortByTag(arr)
    else if (activeProperty === 'Name') sortedArr = sortByName(arr)

    // if the reverseSortBtn is down, return a reversed array
    if (
        reverseSortBtn
            .querySelector('.reverse-btn-icon')
            .classList.contains('fa-long-arrow-down')
    ) {
        return sortedArr.reverse()
    }
    return sortedArr
}

const sortByDate = arr => {
    let sortedArr = [...arr]
    sortedArr.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    return sortedArr
}
const sortByTime = arr => {
    let sortedArr = [...arr]
    sortedArr.sort((a, b) => {
        return b.time - a.time
    })
    return sortedArr
}
const sortByTag = arr => {
    let sortedArr = [...arr]
    sortedArr.sort((a, b) => a.tag.name.localeCompare(b.tag.name))

    return sortedArr
}
const sortByName = arr => {
    let sortedArr = [...arr]
    sortedArr.sort((a, b) => a.name.localeCompare(b.name))
    return sortedArr
}

// Add event listener to the reverse sort button
const reverseSortBtn = document.querySelector(
    '#sortByOrderDropdown .reverse-btn'
)
reverseSortBtn.addEventListener('click', event => {
    // Stop Propagation for reverse sorting button so that dropdown doesn't get toggled
    event.stopPropagation()

    if (
        reverseSortBtn
            .querySelector('.reverse-btn-icon')
            .classList.contains('fa-long-arrow-up')
    ) {
        // Flip arrow in reverseSortBtn
        reverseSortBtn
            .querySelector('.reverse-btn-icon')
            .classList.remove('fa-long-arrow-up')
        reverseSortBtn
            .querySelector('.reverse-btn-icon')
            .classList.add('fa-long-arrow-down')
    } else {
        // Flip arrow in reverseSortBtn
        reverseSortBtn
            .querySelector('.reverse-btn-icon')
            .classList.remove('fa-long-arrow-down')
        reverseSortBtn
            .querySelector('.reverse-btn-icon')
            .classList.add('fa-long-arrow-up')
    }
    updateTimeTable(timesInfoList)
})

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
