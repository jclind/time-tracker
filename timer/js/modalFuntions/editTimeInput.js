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

const isNumberKey = e => {
    if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
        return false
    }
    return true
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
