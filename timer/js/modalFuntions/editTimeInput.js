const editHourInp = document.querySelector('#modalEditTimeInput .hours input')
const editMinuteInp = document.querySelector(
    '#modalEditTimeInput .minutes input'
)
const editSecondInp = document.querySelector(
    '#modalEditTimeInput .seconds input'
)
const editMillisecondInp = document.querySelector(
    '#modalEditTimeInput .milliseconds input'
)

document.querySelector('#modalEditTimeInput').addEventListener('click', () => {
    editHourInp.focus()
    editHourInp.select()
})

editHourInp.addEventListener('keyup', function (event) {
    const val = editHourInp.value
    if (event.keyCode === 13 || event.keyCode === 9) {
        event.preventDefault()
        console.log(val.length)
        if (val.length === 0) {
            editHourInp.value = editHourInp.placeholder
            console.log(editHourInp.placeholder, 'hi')
        }

        if (event.keyCode === 13) editMinuteInp.select()
    }
})

editMinuteInp.addEventListener('keyup', function (event) {
    const val = editMinuteInp.value
    if (event.keyCode === 13 || event.keyCode === 9) {
        event.preventDefault()
        if (val.length === 0) {
            editMinuteInp.value = editMinuteInp.placeholder
        } else if (val.length === 1) {
            editMinuteInp.value = '0' + val
        }

        if (event.keyCode === 13) editSecondInp.select()
    }
    if (val.length >= 2) {
        editSecondInp.select()
    }
})
editSecondInp.addEventListener('keyup', function (event) {
    if (event.keyCode === 9) {
        event.preventDefault()
    }

    const val = editSecondInp.value
    if (event.keyCode === 13 || event.keyCode === 9) {
        event.preventDefault()
        if (val.length === 0) {
            editSecondInp.value = editSecondInp.placeholder
        } else if (val.length === 1) {
            editSecondInp.value = '0' + val
        }

        if (event.keyCode === 13) editMinuteInp.select()
    }
    if (val.length >= 2) {
        editMillisecondInp.select()
    }
})
editMillisecondInp.addEventListener('keyup', function (event) {
    const val = editMillisecondInp.value
    if (event.keyCode === 13 || event.keyCode === 9) {
        event.preventDefault()
        if (val.length === 0) {
            editMillisecondInp.value = editMillisecondInp.placeholder
        } else if (val.length === 1) {
            editMillisecondInp.value = '0' + val
        }

        if (event.keyCode === 13) editMillisecondInp.blur()
    }
    if (val.length >= 2) {
        editMillisecondInp.blur()
    }
})
