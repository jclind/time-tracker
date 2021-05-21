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

// Control hour input selection and time input
editHourInp.onblur = () => {
    if (editHourInp.value.length === 0) {
        editHourInp.value = editHourInp.placeholder
    }
    editMinuteInp.select()
    editMinuteInp.focus()
}
editHourInp.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        editHourInp.blur()
    }
})
// Control minute input selection and time input
editMinuteInp.onblur = () => {
    if (editMinuteInp.value.length === 0) {
        editMinuteInp.value = editMinuteInp.placeholder
    } else if (editMinuteInp.value.length === 1) {
        editMinuteInp.value = '0' + editMinuteInp.value
    }
    editSecondInp.select()
    editSecondInp.focus()
}
editMinuteInp.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        editMinuteInp.blur()
    }
    console.log(editMinuteInp.value.length)
    if (editMinuteInp.value.length >= 2) {
        editMinuteInp.blur()
    }
})
// Control second input selection and time input
editSecondInp.onblur = () => {
    if (editSecondInp.value.length === 0) {
        editSecondInp.value = editSecondInp.placeholder
    } else if (editSecondInp.value.length === 1) {
        editSecondInp.value = '0' + editSecondInp.value
    }
    editMillisecondInp.select()
    editMillisecondInp.focus()
}
editSecondInp.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        editSecondInp.blur()
    }
    console.log(editSecondInp.value.length)
    if (editSecondInp.value.length >= 2) {
        editSecondInp.blur()
    }
})
// Control second input selection and time input
editMillisecondInp.onblur = () => {
    if (editMillisecondInp.value.length === 0) {
        editMillisecondInp.value = editMillisecondInp.placeholder
    } else if (editMillisecondInp.value.length === 1) {
        editMillisecondInp.value = '0' + editMillisecondInp.value
    }
    document.getElementById('modalEditDescriptionInput').select()
}
editMillisecondInp.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        editMillisecondInp.blur()
    }
    console.log(editMillisecondInp.value.length)
    if (editMillisecondInp.value.length >= 2) {
        editMillisecondInp.blur()
    }
})

// editHourInp.addEventListener('keyup', function (event) {
//     const val = editHourInp.value
//     if (event.keyCode === 13 || event.keyCode === 9) {
//         // event.preventDefault()
//         // console.log(val.length)
//         // if (val.length === 0) {
//         //     editHourInp.value = editHourInp.placeholder
//         //     console.log(editHourInp.placeholder, 'hi')
//         // }
//         // if (event.keyCode === 13) editMinuteInp.select()
//     }
//     console.log('yooooo 1')
//     editHourInp.onblur = () => {
//         console.log('yooooo 2')
//     }
// })

// editMinuteInp.addEventListener('keyup', function (event) {
//     const val = editMinuteInp.value
//     if (event.keyCode === 13 || event.keyCode === 9) {
//         event.preventDefault()
//         if (val.length === 0) {
//             editMinuteInp.value = editMinuteInp.placeholder
//         } else if (val.length === 1) {
//             editMinuteInp.value = '0' + val
//         }

//         if (event.keyCode === 13) editSecondInp.select()
//     }
//     if (val.length >= 2) {
//         editSecondInp.select()
//     }
// })
// editSecondInp.addEventListener('keyup', function (event) {
//     if (event.keyCode === 9) {
//         event.preventDefault()
//     }

//     const val = editSecondInp.value
//     if (event.keyCode === 13 || event.keyCode === 9) {
//         event.preventDefault()
//         if (val.length === 0) {
//             editSecondInp.value = editSecondInp.placeholder
//         } else if (val.length === 1) {
//             editSecondInp.value = '0' + val
//         }

//         if (event.keyCode === 13) editMinuteInp.select()
//     }
//     if (val.length >= 2) {
//         editMillisecondInp.select()
//     }
// })
// editMillisecondInp.addEventListener('keyup', function (event) {
//     const val = editMillisecondInp.value
//     if (event.keyCode === 13 || event.keyCode === 9) {
//         event.preventDefault()
//         if (val.length === 0) {
//             editMillisecondInp.value = editMillisecondInp.placeholder
//         } else if (val.length === 1) {
//             editMillisecondInp.value = '0' + val
//         }

//         if (event.keyCode === 13) editMillisecondInp.blur()
//     }
//     if (val.length >= 2) {
//         editMillisecondInp.blur()
//     }
// })
