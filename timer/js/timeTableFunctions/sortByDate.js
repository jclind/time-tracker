let activeDate = 'Today'

let sortByDateBtns = document.querySelectorAll('#sortByDateBtns button')
sortByDateBtns.forEach(btn => {
    btn.addEventListener('click', () => selectActiveDate(btn.id))
})

const selectActiveDate = btnID => {
    const currBtn = document.getElementById(btnID)
    if (currBtn.innerText !== activeDate) {
        if (!currBtn.classList.contains('active-sort-btn')) {
            sortByDateBtns.forEach(btn => {
                if (btn.classList.contains('active-sort-btn')) {
                    btn.classList.remove('active-sort-btn')
                }
            })
        }
        currBtn.classList.add('active-sort-btn')
        activeDate = currBtn.innerText
        sortByDate()
    }
}

const sortByDate = () => {
    if (activeDate === 'Today') sortByToday()
    else if (activeDate === 'Yesterday') sortByYesterday()
    else if (activeDate === 'Week') sortByWeek()
    else if (activeDate === 'Month') sortByMonth()
    else if (activeDate === 'Year') sortByYear()
    else if (activeDate === 'AllTime') sortByAllTime()
}

const sortByToday = () => {
    let date = new Date()

    let filteredArr = timesInfoList.filter(time => {
        return areEqualDates(date, time.date)
    })

    return filteredArr
}
const sortByYesterday = () => {
    let date = new Date()
    date.setDate(date.getDate() - 1)

    let filteredArr = timesInfoList.filter(time => {
        return areEqualDates(date, time.date)
    })
}
const sortByWeek = () => {
    let filteredArr
    let curr = new Date()

    let currTemp = new Date()
    let first = currTemp.getDate() - currTemp.getDay()
    let firstDay = new Date(currTemp.setDate(first))

    let numDays = curr.getDate() - first
    for (let i = 0; i <= numDays; i++) {
        let date = new Date()
        date.setDate(date.getDate() - i)
    }

    // console.log(curr)
    // console.log(firstDay)
}
const sortByMonth = () => {}
const sortByYear = () => {}
const sortByAllTime = () => {}

// Creating functions for all different sorting methods. Need to add updateTimeTable function
// to end of sortByDate function and have each sortBy(x) funciton return an array.

const areEqualDates = (d1, d2) => {
    let day1 = d1.getDate()
    let month1 = d1.getMonth()
    let year1 = d1.getYear()

    let day2 = d2.getDate()
    let month2 = d2.getMonth()
    let year2 = d2.getYear()

    return day1 === day2 && month1 === month2 && year1 === year2
}
