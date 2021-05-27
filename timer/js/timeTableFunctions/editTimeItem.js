const editTimeTitleFromTable = key => {
    const timeTitleEl = document.querySelector(
        `#${key} .card-body .time-title h1`
    )
    const originalValue = timeTitleEl.innerText

    let timesInfoListElIdx = timesInfoList.findIndex(time => time.key === key)

    // Prevent enter key from creating newline
    $(timeTitleEl).keypress(function (e) {
        if (e.which === 13) {
            timeTitleEl.blur()
        }
        return e.which != 13
    })

    $(timeTitleEl).focusout(() => {
        if (originalValue !== timeTitleEl.innerText) {
            console.log('hello from here')
            timesInfoList[timesInfoListElIdx].name = timeTitleEl.innerText
        }
    })
}
