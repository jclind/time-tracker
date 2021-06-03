// !! FIXME: Need a way to go back to former time inputs and for editing inputs when there
// !! are already values, currently skips over when tab is pressed.

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

editHourInp.addEventListener('click', event => {
    event.stopPropagation()
})
editMinuteInp.addEventListener('click', event => {
    event.stopPropagation()
})
editSecondInp.addEventListener('click', event => {
    event.stopPropagation()
})
editMillisecondInp.addEventListener('click', event => {
    event.stopPropagation()
})

$(editHourInp).bind('input', function () {
    let $this = $(this)
    console.log($this.next('div input'))
    setTimeout(function () {
        console.log($this.val().length)
        if ($this.val().length >= parseInt($this.attr('maxlength'), 10)) {
            editMinuteInp.focus()
            editMinuteInp.select()
        }
    }, 0)
})
$(editMinuteInp).bind('input', function () {
    let $this = $(this)
    console.log($this.next('div input'))
    setTimeout(function () {
        console.log($this.val().length)
        if ($this.val().length >= parseInt($this.attr('maxlength'), 10)) {
            editSecondInp.focus()
            editSecondInp.select()
        }
    }, 0)
})
$(editMinuteInp).on('blur', function () {
    let $this = $(this)
    console.log($this.val().length)
    if ($this.val().length === 1) {
        editMinuteInp.value = '0' + editMinuteInp.value
    }
})
$(editSecondInp).bind('input', function () {
    let $this = $(this)
    console.log($this.next('div input'))
    setTimeout(function () {
        console.log($this.val().length)
        if ($this.val().length >= parseInt($this.attr('maxlength'), 10)) {
            editMillisecondInp.focus()
            editMillisecondInp.select()
        }
    }, 0)
})
$(editSecondInp).on('blur', function () {
    let $this = $(this)
    console.log($this.val().length)
    if ($this.val().length === 1) {
        editSecondInp.value = '0' + editSecondInp.value
    }
})

$(editMillisecondInp).bind('input', function () {
    let $this = $(this)
    console.log($this.next('div input'))
    setTimeout(function () {
        console.log($this.val().length)
        if ($this.val().length >= parseInt($this.attr('maxlength'), 10)) {
            document.querySelector('#modalEditDescriptionInput').focus()
        }
    }, 0)
})
$(editMillisecondInp).on('blur', function () {
    let $this = $(this)
    console.log($this.val().length)
    if ($this.val().length === 1) {
        editMillisecondInp.value = '0' + editMillisecondInp.value
    }
})

// editMinuteInp.addEventListener('keydown', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('editMinute keydown')
//         event.preventDefault()
//     }
// })
// editMinuteInp.addEventListener('keyup', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('editMinute keyup tab/enter')
//         event.preventDefault()
//         editSecondInp.select()
//         editSecondInp.focus()
//     } else {
//         console.log('editMinute keyup number/letter')
//         if (editMinuteInp.value.length >= 2) {
//             console.log('EditMinute value >= 2')
//             if (isFinite(event.key)) {
//                 console.log('EditMinute value is a number')
//                 editSecondInp.select()
//                 editSecondInp.focus()
//             }
//         }
//     }
// })

// editSecondInp.addEventListener('keydown', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('editSecond keydown')
//         event.preventDefault()
//     }
// })
// editSecondInp.addEventListener('keyup', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('editSecond keyup tab/enter')
//         event.preventDefault()
//         editMillisecondInp.select()
//         editMillisecondInp.focus()
//     } else {
//         console.log('EditSecond keyup number/letter')
//         if (editSecondInp.value.length >= 2) {
//             console.log('EditSecond value >= 2')
//             if (isFinite(event.key)) {
//                 console.log('EditSecond value is a number')
//                 editMillisecondInp.select()
//                 editMillisecondInp.focus()
//             }
//         }
//     }
// })

// editHourInp.addEventListener('keydown', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('tab/enter was pressed in Hour')
//         event.preventDefault()
//         editMinuteInp.select()
//         editMinuteInp.focus()
//     }
// })
// editMinuteInp.addEventListener('keydown', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('tab/enter was pressed in Minute')
//         event.preventDefault()
//         editSecondInp.select()
//         editSecondInp.focus()
//     } else {
//         console.log(editMinuteInp.value.length)
//         if (event.keyCode != 9 && event.keyCode != 13) {
//             if (editMinuteInp.value.length >= 1) {
//                 console.log('Was the point reached?')
//                 if (isFinite(event.key)) {
//                     console.log('How about this point?')
//                     editMinuteInp.blur()
//                     editSecondInp.select()
//                     editSecondInp.focus()
//                 }
//             }
//         }
//     }
// })
// editMinuteInp.addEventListener('keypress', event => {})

// editSecondInp.addEventListener('keydown', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('tab/enter was pressed in Second')
//         event.preventDefault()
//         editMillisecondInp.select()
//         editMillisecondInp.focus()
//     }
// })
// editSecondInp.addEventListener('keypress', event => {
//     console.log(event.keyCode)
//     if (event.keyCode != 9 && event.keyCode != 13) {
//         if (editSecondInp.value.length >= 2) {
//             if (editSecondInp.value.length > 2) {
//                 editSecondInp.value = editSecondInp.value.substring(0, 2)
//             }
//             if (isFinite(event.key)) {
//                 editMillisecondInp.select()
//                 editMillisecondInp.focus()
//             }
//         }
//     } else {
//         event.preventDefault()
//     }
// })

// editMillisecondInp.addEventListener('keydown', event => {
//     if (event.keyCode == 9 || event.keyCode == 13) {
//         console.log('tab/enter was pressed in Millisecond')
//         event.preventDefault()
//         document.querySelector('#modalEditDescriptionInput').select()
//     }
// })
// editMillisecondInp.addEventListener('keypress', event => {
//     if (event.keyCode != 9 && event.keyCode != 13) {
//         if (editMillisecondInp.value.length >= 2) {
//             if (editMillisecondInp.value.length > 2) {
//                 editMillisecondInp.value = editMillisecondInp.value.substring(
//                     0,
//                     2
//                 )
//             }
//             if (isFinite(event.key)) {
//                 document.querySelector('#modalEditDescriptionInput').select()
//             }
//         }
//     } else {
//         event.preventDefault()
//     }
// })

const isNumberKey = e => {
    if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
        return false
    }
    return true
    // console.log('I here')
    // if (
    //     (e.keyCode >= 48 && e.keyCode <= 57) ||
    //     (e.keyCode >= 96 && e.keyCode <= 105)
    // ) {
    //     console.log('true')
    //     return true
    // }
    // console.log('false')
    // return false
}

const editTimeModalTimeInput = time => {
    let [h, m, s, ms] = msToTimeObjFormat(time)

    // Set the hour input placeholder to the current time object's hour value
    if (h === 0) {
        h = '0' + h
    }
    editHourInp.placeholder = h
    editHourInp.value = ''
    // Set the minute input placeholder to the current time object's hour value
    if (m < 10) {
        m = '0' + m
    }
    editMinuteInp.placeholder = m
    editMinuteInp.value = ''
    // Set the second input placeholder to the current time object's hour value
    if (s < 10) {
        s = '0' + s
    }
    editSecondInp.placeholder = s
    editSecondInp.value = ''
    // Set the millisecond input placeholder to the current time object's hour value
    if (ms < 10) {
        ms = '0' + ms
    }
    editMillisecondInp.placeholder = ms
    editMillisecondInp.value = ''
}

const editTimeModalInputIsChanged = time => {
    let h, m, s, ms
    // If there is no value in the hour input, set h = to the placeholder
    if (editHourInp.value != '') {
        h = Number(editHourInp.value)
    } else {
        h = Number(editHourInp.placeholder)
    }
    if (editMinuteInp.value != '') {
        m = Number(editMinuteInp.value)
    } else {
        m = Number(editMinuteInp.placeholder)
    }
    if (editSecondInp.value != '') {
        s = Number(editSecondInp.value)
    } else {
        s = Number(editSecondInp.placeholder)
    }
    if (editMillisecondInp.value != '') {
        ms = Number(editMillisecondInp.value) * 10
    } else {
        ms = Number(editMillisecondInp.placeholder) * 10
    }

    let currTime = timeObjToMSFormat([h, m, s, ms])
    if (currTime === time) {
        return undefined
    }
    return currTime
}
