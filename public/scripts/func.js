// Holds userful functions for other js scripts 

// Find total time so far for each element, returns object with array of hours, minutes, seconds, and milliseconds
const findElapsedTime = (index, arr) => {
    let totH = 0, totM = 0, totS = 0, totMs = 0;
    for (let i = 0; i < index + 1; i++) {
        totH += arr[i].time.hours;
        totM += arr[i].time.minutes;
        totS += arr[i].time.seconds;
        totMs += arr[i].time.milliseconds

        // fix additions of times. i.e. add to minutes if seconds is over or equal to 60 seconds. 
        if (totMs >= 100) {
            totMs -= 100;
            totS++;
        }
        if (totS >= 60) {
            totS -= 60;
            totM++; 
        }
        if (totM >= 60) {
            totM -= 60; 
            totH++;
        }
    }
    return {hours: totH, minutes: totM, seconds: totS, milliseconds: totMs};
}

// Returns total time of all time objects in given array.
const findArrTime = (arr) => {
    if (arr.length != 0) {
        let test = msToString(arr.reduce((totTime, currVal) => totTime + stringToMS(currVal.time), 0));
        return test
    }
    return msToString(0);
}





// Convert time string to number of milliseconds
const stringToMS = (obj) => {
    let hours = obj.hours
    let minutes = obj.minutes
    let seconds = obj.seconds
    let milliseconds = obj.milliseconds
    
    let totalMS = (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + (milliseconds * 10)
    
    return totalMS;
}
// Convert number of milliseconds to formated time string
function msToString(ms) {
    let hours = 0, minutes = 0, seconds = 0
    if (ms >= 3600000) {
        console.log(ms)
        hours = Math.floor(ms / 3600000)
        ms = ms % 3600000
        console.log(hours, ms)
    }
    if (ms >= 60000) {
        minutes = Math.floor(ms / 60000)
        ms = ms % 60000
    }
    if (ms >= 1000) {
        seconds = Math.floor(ms / 1000)
        ms = ms % 1000
    }

    return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + "." + (ms < 10 ? "0" + ms : ms)
}

// Compares if time strings are greater/equal/less than each other.
// If -1 a < b, if 0 a = b, if 1 a > b
const compareTimeObjects = (a, b) => {
    let aStr = `${a.hours}:${(a.minutes < 10 ? "0" + a.minutes : a.minutes)}:${(a.seconds < 10 ? "0" + a.seconds : a.seconds)}.${(a.milliseconds < 10 ? "0" + a.milliseconds : a.milliseconds)}`
    let bStr = `${b.hours}:${(b.minutes < 10 ? "0" + b.minutes : b.minutes)}:${(b.seconds < 10 ? "0" + b.seconds : b.seconds)}.${(b.milliseconds < 10 ? "0" + b.milliseconds : b.milliseconds)}`
    return aStr.localeCompare(bStr);
}


// Returns true if both inputed objects are equal
const objEqual = (o1, o2) => {
    if (o1.name != o2.name) {
        return false;
    }
    if (o1.date != o2.date) {
        return false;
    }
    if (o1.time.hours != o2.time.hours || o1.time.minutes != o2.time.minutes || o1.time.seconds != o2.time.seconds || o1.time.milliseconds != o2.time.milliseconds) {
        return false;
    }
    if (o1.timeTag.name != o2.timeTag.name || o1.timeTag.color != o2.timeTag.color) {
        return false;
    }
    return true;
}












// Remove possible second scroll bar
$('html').css('overflow-x', 'initial');



// Change footer year to current year.
document.getElementById('copyright').innerHTML = `©${new Date().getFullYear()} Jesse Lind`;
