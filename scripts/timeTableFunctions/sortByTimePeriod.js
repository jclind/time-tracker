let activeDate = 'Today'

let sortByDateBtns = document.querySelectorAll('#sortByDateBtns button')
sortByDateBtns.forEach(btn => {
    btn.addEventListener('click', () => selectActiveDate(btn.id))
})

const selectActiveDate = btnID => {
    const currBtn = document.getElementById(btnID)
    if (currBtn.innerText !== activeDate) {
        // Remove active class to any previous button before adding it to the clicked button
        if (!currBtn.classList.contains('active-sort-btn')) {
            sortByDateBtns.forEach(btn => {
                if (btn.classList.contains('active-sort-btn')) {
                    btn.classList.remove('active-sort-btn')
                }
            })
        }
        currBtn.classList.add('active-sort-btn')
        // Set activeDate equal to the clicked button's text (Today, yesterday, etc...)
        activeDate = currBtn.innerText
        updateTimeTable(timesInfoList)
    }
}

// Calls different sorting functions based on what the value of activeDate is.
const sortByTimePeriod = arr => {
    let filteredArr
    if (activeDate === 'Today') filteredArr = sortByToday(arr)
    else if (activeDate === 'Yesterday') filteredArr = sortByYesterday(arr)
    else if (activeDate === 'Week') filteredArr = sortByWeek(arr)
    else if (activeDate === 'Month') filteredArr = sortByMonth(arr)
    else if (activeDate === 'Year') filteredArr = sortByYear(arr)
    else filteredArr = arr

    return filteredArr
}

const sortByToday = arr => {
    let date = new Date()

    let filteredArr = arr.filter(time => {
        timeDate = new Date(time.date)
        return areEqualDates(date, timeDate)
    })

    return filteredArr
}
const sortByYesterday = arr => {
    let date = new Date()
    date.setDate(date.getDate() - 1)

    let filteredArr = arr.filter(time => {
        timeDate = new Date(time.date)
        return areEqualDates(date, timeDate)
    })

    return filteredArr
}
const sortByWeek = arr => {
    let filteredArr = []
    let curr = new Date()

    let currTemp = new Date()
    let first = currTemp.getDate() - currTemp.getDay()
    let firstDay = new Date(currTemp.setDate(first))

    let numDays = curr.getDate() - first
    for (let i = 0; i <= numDays; i++) {
        let date = new Date()
        date.setDate(date.getDate() - i)

        currDateArr = arr.filter(time => {
            timeDate = new Date(time.date)
            return areEqualDates(date, timeDate)
        })
        filteredArr.push(...currDateArr)
    }

    return filteredArr
}
const sortByMonth = arr => {
    let filteredArr = []
    let curr = new Date()
    let currDay = curr.getDate()

    for (let i = 0; i < currDay; i++) {
        let date = new Date()
        date.setDate(date.getDate() - i)

        let currDateArr = arr.filter(time => {
            let timeDate = new Date(time.date)

            return areEqualDates(date, timeDate)
        })
        filteredArr.push(...currDateArr)
    }

    return filteredArr
}
const sortByYear = arr => {
    let filteredArr = []

    dayOfYear = date =>
        Math.floor(
            (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
        )

    currDayOfYear = dayOfYear(new Date())
    for (let i = 0; i < currDayOfYear; i++) {
        let date = new Date()
        date.setDate(date.getDate() - i)

        currDateArr = arr.filter(time => {
            let timeDate = new Date(time.date)

            return areEqualDates(date, timeDate)
        })
        filteredArr.push(...currDateArr)
    }

    return filteredArr
}

const areEqualDates = (d1, d2) => {
    let day1 = d1.getDate()
    let month1 = d1.getMonth()
    let year1 = d1.getFullYear()

    let day2 = d2.getDate()
    let month2 = d2.getMonth()
    let year2 = d2.getFullYear()

    return day1 === day2 && month1 === month2 && year1 === year2
}
