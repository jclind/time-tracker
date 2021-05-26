const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = user => {
    if (user) {
        // User Logs in
        // Show logged in links and hide logged out links
        loggedInLinks.forEach(item => {
            if (item.classList.contains('d-none')) {
                item.classList.remove('d-none')
                item.classList.add('d-flex')
            }
        })
        loggedOutLinks.forEach(item => {
            if (item.classList.contains('d-flex')) {
                item.classList.remove('d-flex')
                item.classList.add('d-none')
            }
        })
        console.log(user)
        db.collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                timesInfoList = doc.data().timesInfoList
                timeTags = doc.data().timeTags

                // Add data to account modal
                const accountModalNameInput = document.getElementById(
                    'accountModalNameInput'
                )
                const accountModalEmailInput = document.getElementById(
                    'accountModalEmailInput'
                )
                accountModalEmailInput.value = user.email
                accountModalNameInput.value = doc.data().name
                updateTimeTable(timesInfoList)
            })
    } else {
        // User Logs out

        // Show logged out links and hide logged in links
        loggedInLinks.forEach(item => {
            if (item.classList.contains('d-flex')) {
                item.classList.remove('d-flex')
                item.classList.add('d-none')
            }
        })
        loggedOutLinks.forEach(item => {
            if (item.classList.contains('d-none')) {
                item.classList.remove('d-none')
                item.classList.add('d-flex')
            }
        })
        accountModalNameInput.value = 'No User Signed In'
        accountModalEmailInput.value = 'No User Signed In'
        updateTimeTable(timesInfoList)
    }

    let lastTimesInfoEl = timesInfoList[timesInfoList.length - 1]
    // Check if timeTags is empty before using accessing it's data
    if (timeTags.length === 0) {
        timeTags.push({ name: 'Main', color: '#fd483f' })
    }
    // If timesInfoList isn't empty, change tag button name to last submitted tag name
    if (timesInfoList.length > 0) {
        document.getElementById('activeTimeTagSelectionBtnName').innerText =
            lastTimesInfoEl.tag.name
        document.getElementById('activeTimeTagSelectionBtnColor').style.color =
            lastTimesInfoEl.tag.color
    } else {
        // Set active tag to the first tag in the timeTags array
        document.getElementById('activeTimeTagSelectionBtnName').innerText =
            timeTags[0].name
        document.getElementById('activeTimeTagSelectionBtnColor').style.color =
            timeTags[0].color
    }
}

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    setupUI(user)
})

const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', e => {
    e.preventDefault()

    // Get user info
    const name = signupForm['signupName'].value
    const email = signupForm['signupEmail'].value
    const password = signupForm['signupPassword'].value

    let userTimesArr = []
    let userTagsArr = []
    // Control user data recorded when not logged in or signed up
    if (timesInfoList.length != 0) {
        userTimesArr = [...timesInfoList]
    }
    if (timeTags.length != 0) {
        userTagsArr = [...timeTags]
    }

    // Sign user up
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                name: name,
                timesInfoList: userTimesArr,
                timeTags: userTagsArr,
            })
        })
        .then(() => {
            const modal = document.querySelector('#signupModal')
            $(modal).modal('hide')
            signupForm.reset()
        })
})

// Signin method
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', e => {
    e.preventDefault()

    // Get user info
    const email = loginForm['loginEmail'].value
    const password = loginForm['loginPassword'].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // Close login modal and reset form
        const modal = document.querySelector('#loginModal')
        $(modal).modal('hide')
        loginForm.reset()
    })
})

// Logout method
const logout = document.querySelector('#logout')
logout.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut().then(() => {
        timesInfoList = []
        timeTags = [
            { name: 'Main', color: '#fd483f' },
            { name: 'School', color: '#f5df4f' },
            { name: 'Work', color: '#3d3d90' },
            { name: 'Exersice', color: '#b36b0e' },
            { name: 'Chores', color: '#694214' },
            { name: 'Projects', color: '#0a724f' },
        ]
        updateTimeTable(timesInfoList)
    })
})
