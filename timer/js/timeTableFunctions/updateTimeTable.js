const updateTimeTable = timesArray => {
    const timeTableAccordian = document.getElementById('timeTableAccordian')
    timeTableAccordian.innerHTML = ''

    timesArray.forEach(el => {
        timeTableAccordian.innerHTML += `
            <div class="card time-item mb-3">
                <div
                    class="card-header time-item-header d-flex justify-content-between align-items-center position-relative"
                >
                    <div class="d-flex flex-column mb-3">
                        <div class="time-title ml-4">
                            ${el.name}
                        </div>
                        <div
                            class="time-container d-flex justify-content-around align-items-center mr-3 mb-1"
                        >
                            <div class="time-text mx-4">${formatTime(
                                el.time
                            )}</div>
                            <div
                                class="tag-icon d-flex align-items-center px-2"
                                style="background: ${el.tag.color}"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    fill="currentColor"
                                    class="bi bi-tag-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                                    />
                                </svg>
                                <span class="ml-1 tag-text">${
                                    el.tag.name
                                }</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-time-date px-2">
                        <span class="date">${formatTimeItemDate(
                            el.date
                        )}</span><br />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            class="bi bi-clock"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                            />
                            <path
                                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
                            />
                        </svg>
                        <span class="time">${formatTimeItemTimeSegment(
                            el.startTime,
                            el.finishTime
                        )}</span>
                    </div>
                    <button
                        class="btn btn-link collapse-btn p-0"
                        type="button"
                        data-toggle="collapse"
                        data-target="#${el.key}"
                        aria-expanded="true"
                        aria-controls="${el.key}"
                    >
                        <span style="font-size: 30px" class="d-block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-caret-up-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                <div
                    id="${el.key}"
                    class="collapse"
                    data-parent="#timeTableAccordian"
                >
                    <div class="card-body inner-time-item">
                        <h1 class="time-title text-center">
                            ${el.name}
                        </h1>
                        <div class="underline"></div>
                        <div
                            class="time-stats-container container d-flex justify-content-around flex-row mt-3"
                        >
                            <div class="mx-5 time-stat">
                                <label class="p-0 m-0">Date:</label>
                                <div>${el.date.getMonth()}/${el.date.getDate()}/${el.date.getYear()}</div>
                            </div>
                            <div class="mx-5 time-stat">
                                <label class="p-0 m-0"
                                    >Time Segment:</label
                                >
                                <div>${formatTimeItemTimeSegment(
                                    el.startTime,
                                    el.finishTime
                                )}</div>
                            </div>
                        </div>
                        <div class="time-description">
                            <label class="mt-4 mb-2"
                                >Description:</label
                            >
                            <p class="p-1">
                                ${el.description}
                            </p>
                        </div>
                        <div
                            class="edit-btns d-flex justify-content-center"
                        >
                            <button
                                class="btn btn-secondary"
                                style="background: #00adb5"
                                data-toggle="modal"
                                data-target="#editTimeModal"
                            >
                                Edit
                            </button>
                            <button class="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
        
        `
    })
}

const formatTimeItemDate = date => {
    let timeDay = date.getDate()
    let timeMonth = date.getMonth()
    let timeYear = date.getYear()

    let currDate = new Date()
    let yesterday = new Date(currDate)
    yesterday.setDate(yesterday.getDate() - 1)

    // Check if time's date is today
    if (
        timeDay === currDate.getDate() &&
        timeMonth === currDate.getMonth() &&
        timeYear === currDate.getYear()
    ) {
        return 'Today'
    } else if (
        timeDay === yesterday.getDate() &&
        timeMonth === yesterday.getMonth() &&
        timeYear === yesterday.getYear()
    ) {
        return 'Yesterday'
    } else {
        return `${timeMonth}/${timeDay}/${timeYear}`
    }
}

const formatTimeItemTimeSegment = (startTime, finishTime) => {
    let startHours = startTime.getHours()
    let startMinutes = startTime.getMinutes()
    let startAMPM = startHours >= 12 ? 'pm' : 'am'
    startHours = startHours % 12
    startHours = startHours ? startHours : 12 // The hour '0' shuold be set to '12'
    startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes // Format minutes if less than 10

    let finishHours = finishTime.getHours()
    let finishMinutes = finishTime.getMinutes()
    let finishAMPM = startHours >= 12 ? 'pm' : 'am'
    finishHours = finishHours % 12
    finishHours = finishHours ? finishHours : 12 // The hour '0' shuold be set to '12'
    finishMinutes = finishMinutes < 10 ? '0' + finishMinutes : finishMinutes // Format minutes if less than 10

    return `${startHours}:${startMinutes}${startAMPM}-${finishHours}:${finishMinutes}${finishAMPM}`
}
