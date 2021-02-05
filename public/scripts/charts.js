// !Tag Distribution Graph Functions

let tagDistributionGraph;
function drawTagDistributionGraph(timespan) {
    let tagLabels = [], tagData = [], tagColors = [];
    let chartTitle;

    // Get Tag information for the tag distribution graph
    if (currentTimesArray.length != 0) {
        // Loop through time tags and find sum of all currentTimesArray item milliseconds associated with that tag.
        for (tag in timeTags) {
            let currTagName = timeTags[tag].name;
            let tagSum = 0;
            for (item in currentTimesArray) {
                if ((currentTimesArray[item].timeTag.name == currTagName)) {
                    tagSum += stringToMS(currentTimesArray[item].time)
                }
            }
            if (tagSum != 0) {
                tagLabels.push(currTagName)
                tagData.push(tagSum)
                let currColor = timeTags[tag].color;
                tagColors.push(currColor)
            } 
        }
    } else {
        tagLabels = [''];
        tagData = [100];
        tagColors = ['Gray'];
    }

    // Change chart title based on the current time span selected
    if (timespan == 'today-btn') {
        chartTitle = 'Tag Distribution From Today'
    } else if (timespan == 'yesterday-btn') {
        chartTitle = 'Tag Distribution From Yesterday'
    } else if (timespan == 'week-btn') {
        chartTitle = 'Tag Distribution From This Week'
    } else if (timespan == 'month-btn') {
        chartTitle = 'Tag Distribution From This Month'
    } else if (timespan == 'year-btn') {
        chartTitle = 'Tag Distribution From This Year'
    } else if (timespan == 'all-time-btn') {
        chartTitle = 'Tag Distributions By All Time'
    }

    const ctxTagDis = document.getElementById('tag-distribution').getContext('2d');
    let borderWidth, legendDisplay, dataLabelsDisplay;
    if (tagLabels.length != 0 && currentTimesArray.length != 0) {
        tagLabels
        borderWidth = 1;
        legendDisplay = true;
        dataLabelsDisplay = true;
    } else {
        borderWidth = 0;      
        legendDisplay = false;  
        dataLabelsDisplay = false;
    }
    // If an old chart exists, remove the whole chart.
    if (tagDistributionGraph) {
        tagDistributionGraph.destroy()
    }
    tagDistributionGraph = new Chart(ctxTagDis, {
        type: 'doughnut',
        data: {
            labels: tagLabels,
            datasets: [{
                data: tagData,
                backgroundColor: tagColors
            }]
        },
        options: {
            elements: {
                arc: {
                    borderWidth: borderWidth,
                    borderColor: 'gray'
                }
            },
            title: {
                text: chartTitle,
                display: true
            },
            legend: {
                display: legendDisplay,
                position: 'bottom',
                labels: {
                    fontColor: 'black'
                },
                fullWidth: true,
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        let label;
                        if (currentTimesArray.length == 0) {
                            label = "No Data"
                        } else {
                            label = msToString(data['datasets'][0]['data'][tooltipItem['index']])
                        }
                        return label;
                    }
                },
                yAlign: "bottom",
                titleAlign: 'center',
                bodyAlign: 'center',
                titleFontSize: 17,
                bodyFontSize: 15,
                bodyFontStyle: 'bold',
                xPadding: 10,
                yPadding: 10,
                displayColors: false,
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
            },
            plugins: {
                afterDraw: function (chart, option) {
                    let theCenterText = "50%" ;
                    const canvasBounds = canvas.getBoundingClientRect();
                    const fontSz = Math.floor( canvasBounds.height * 0.10 ) ;
                    chart.ctx.textBaseline = 'middle';
                    chart.ctx.textAlign = 'center';
                    chart.ctx.font = fontSz+'px Arial';
                    chart.ctx.fillText(theCenterText, canvasBounds.width/2, canvasBounds.height*0.70 )
                },
                datalabels: {
                    display: dataLabelsDisplay,
                    formatter: (value, ctxTagDis) => {
                        let sum = 0;
                        let dataArr = ctxTagDis.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(1) + '%';
                        return percentage;
                    },
                    color: '#292929',
                    font: {
                        weight: 'bold',
                        size: 13,
                    }
                }
            }
        }
    });
}

// !Time Trends Graph Functions
let timeTrendsGraph;
function drawTimeTrendsGraph(timespan) {
    const ctxTimeTrends = document.getElementById('time-trends').getContext('2d');
    let labels = [], dataset = [];
    let monthToolTipLabels = [];
    let chartTitle;
    if (timespan == 'today-btn' || timespan == 'yesterday-btn') {
        chartTitle = 'Time Trends For Current Week'
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Calculates the amount of time tracked in the last week by days. Starts on Sunday.
        let d = new Date();
        // Loops through all the day of the current week
        for (let i = 0; i <= 6; i++) {
            let tempDate = new Date(d.setDate(d.getDate() - d.getDay() + i))
            let month = tempDate.getMonth() + 1;
            let day = tempDate.getDate();
            let year = tempDate.getFullYear();
            let dateTemp = month + "/" + day + "/" + year
            let tempTotalTime = 0;
            timesInfoList.forEach((obj, idx) => {
                if (dateTemp == timesInfoList[idx].date) {
                    tempTotalTime += stringToMS(timesInfoList[idx].time);
                }
            })
            dataset.push(tempTotalTime)
        }
    } else if (timespan == 'week-btn') {
        chartTitle = 'Time Trends For Last 7 Weeks'
        // Get labels for the week timespan and dataset numbers.
        let d = new Date();
        let tempWeek;
        for (let i = 0; i <= 6; i++) {
            let weekNum = 7;
            if (i == 0) {
                weekNum = 0;
            }
            tempWeek = new Date(d.setDate(d.getDate() - d.getDay() - weekNum))
            let month = tempWeek.getMonth() + 1
            let day = tempWeek.getDate()
            let year = tempWeek.getFullYear()
            let weekTemp = month + "/" + day
            let tempTotalTime = 0;
            let testDate;
            for (let j = 0; j <= 6; j++) {
                let dayNum = 1;
                if (j == 0) {
                    dayNum = 0;
                }
                testDate = new Date(tempWeek.setDate(tempWeek.getDate() + dayNum))
                let month = testDate.getMonth() + 1
                let day = testDate.getDate()
                let year = testDate.getFullYear()
                let dateTemp = month + "/" + day + "/" + year
                timesInfoList.forEach((obj, idx) => {
                    if (dateTemp == timesInfoList[idx].date) {
                        tempTotalTime += stringToMS(timesInfoList[idx].time);
                    }
                })
            }
            dataset.push(tempTotalTime)
            labels.push(weekTemp)
        }
        labels.reverse()
        dataset.reverse()
    } else if (timespan == 'month-btn') {
        chartTitle = 'Time Trends For Current Month By Day'
        let d = new Date();
        let lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0)
        for (let i = lastDay.getDate(); i >= 1; i--) {
            let day = i;
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            if (i == lastDay.getDate() || i == 1) {
                labels.push(month + "/" + day)
            } else if (i % Math.ceil(lastDay.getDate() / 4) == 0) {
                labels.push(month + "/" + day)
            } else {
                labels.push("")
            }
            monthToolTipLabels.push(month + "/" + day)
            let dateTemp = month + "/" + day + "/" + year;
            let tempTotalTime = 0;
            timesInfoList.forEach((obj, idx) => {
                if (dateTemp == timesInfoList[idx].date) {
                    tempTotalTime += stringToMS(timesInfoList[idx].time);
                }
            })
            dataset.push(tempTotalTime)
        }
        monthToolTipLabels.reverse();
        dataset.reverse();
        labels.reverse();
    } else if (timespan == 'year-btn') {
        chartTitle = 'Time Trends For Current Year By Month'
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let d = new Date();
        let tempMonth;
        for (let i = 0; i <= 11; i++) {
            let lastDay = new Date(new Date().getFullYear(), i + 1, 0)
            let tempTotalTime = 0;
            for (let i = 1; i <= lastDay.getDate(); i++) {
                let day = i;
                let month = lastDay.getMonth() + 1;
                let year = lastDay.getFullYear();
                let dateTemp = month + "/" + day + "/" + year;
                timesInfoList.forEach((obj, idx) => {
                    if (dateTemp == timesInfoList[idx].date) {
                        tempTotalTime += stringToMS(timesInfoList[idx].time);
                    }
                })
            }
            dataset.push(tempTotalTime)
        }
    } else if (timespan == 'all-time-btn') {
        chartTitle = 'Time Trends For Past 5 Years'
        let d = new Date();
        let temp;
        for (let i = 0; i < 5; i++) {
            let yearNum = 1;
            if (i == 0) {
                yearNum = 0;
            }
            temp = new Date(d.setFullYear(d.getFullYear() - yearNum));
            labels.push(temp.getFullYear())
            let tempTotalTime = 0;
            for (let j = 0; j <= 11; j++) {
                let lastDay = new Date(new Date().getFullYear(), j + 1, 0)
                for (let k = 1; k <= lastDay.getDate(); k++) {
                    let day = k;
                    let month = lastDay.getMonth() + 1;
                    let year = lastDay.getFullYear() - i;
                    let dateTemp = month + "/" + day + "/" + year;
                    timesInfoList.forEach((obj, idx) => {
                        if (dateTemp == timesInfoList[idx].date) {
                            tempTotalTime += stringToMS(timesInfoList[idx].time);
                        }
                    })
                }
            }
            dataset.push(tempTotalTime)
        }
        dataset.reverse();
        labels.reverse();
    }
    let datasetLabel = 'Hello There'

    if (timeTrendsGraph) {
        timeTrendsGraph.destroy()
    }
    timeTrendsGraph = new Chart(ctxTimeTrends, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: dataset,
                backgroundColor: '#006400'
            }]
        },
        options: {
            showXLabels: 10,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(label, index, labels) {
                                return ((label / 60000 / 10).toFixed(0)) * 10 + ' min'
                        },
                        autoSkip: true,
                        maxTicksLimit: 5,
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0,
                    },
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)'
                    }
                }]
            },
            title: {
                text: chartTitle,
                display: true
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        if (timespan == 'month-btn') {
                            return monthToolTipLabels[tooltipItem[0]['index']]
                        }
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        let label = msToString(data['datasets'][0]['data'][tooltipItem['index']])
                        return label;
                    }
                },
                yAlign: "left",
                titleAlign: 'center',
                bodyAlign: 'center',
                titleFontSize: 17,
                bodyFontSize: 15,
                bodyFontStyle: 'bold',
                xPadding: 10,
                yPadding: 10,
                displayColors: false,
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
            },
            plugins: {
                datalabels: {
                   display: false,
                }
             }
        }
    });
}
