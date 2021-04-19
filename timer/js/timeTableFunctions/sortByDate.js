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

const sortByToday = () => {}
const sortByYesterday = () => {}
const sortByWeek = () => {}
const sortByMonth = () => {}
const sortByYear = () => {}
const sortByAllTime = () => {}

// Creating functions for all different sorting methods. Need to add updateTimeTable function
// to end of sortByDate function and have each sortBy(x) funciton return an array.
