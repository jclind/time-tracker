const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = user => {
    const setActiveTag = () => {
        const lastTimesInfoEl = timesInfoList[timesInfoList.length - 1]
        // Check if timeTags is empty before using accessing it's data
        if (timeTags.length === 0) {
            timeTags.push({
                name: 'Main',
                color: '#fd483f',
                key: generateKey(),
            })
        }
        console.log()
        // If timesInfoList isn't empty, change tag button name to last submitted tag name
        if (timesInfoList.length > 0) {
            console.log(lastTimesInfoEl.tagKey)
            timeTags.forEach(el => console.log(el.key))
            let lastTimesInfoTag = timeTags.find(
                el => el.key === lastTimesInfoEl.tagKey
            )
            // If there is
            if (lastTimesInfoTag === undefined) {
                lastTimesInfoTag = timeTags[0]

                lastTimesInfoEl.tagKey = timeTags[0].key
                saveUserData()
            }
            // Set active tag name
            console.log(lastTimesInfoTag)
            document.getElementById('activeTimeTagSelectionBtnName').innerText =
                lastTimesInfoTag.name
            // Set active tag color
            document.getElementById(
                'activeTimeTagSelectionBtnColor'
            ).style.color = lastTimesInfoTag.color
            // Set active tag key
            document.getElementById('activeTagBtn').dataset.tagKey =
                lastTimesInfoTag.key
        } else {
            // Set active tag to the first tag in the timeTags array
            document.getElementById('activeTimeTagSelectionBtnName').innerText =
                timeTags[0].name
            // Set active tag color
            document.getElementById(
                'activeTimeTagSelectionBtnColor'
            ).style.color = timeTags[0].color
            // Set active tag key
            document.getElementById('activeTagBtn').dataset.tagKey =
                timeTags[0].key
        }
    }

    if (user) {
        console.log('state change')
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
        if (timesInfoList.length <= 0) {
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
                    setActiveTag()
                    updateTimeTable(timesInfoList)
                })
        } else {
            let unsavedTimes = [...timesInfoList]
            // Show save times prompt modal
            $('#saveTimesPromptModal').modal('show')

            const discardBtn = document.querySelector(
                '#saveTimesPromptModal .discard-btn'
            )
            const saveBtn = document.querySelector(
                '#saveTimesPromptModal .save-btn'
            )
            // On discardBtn click, just save timesInfoList and discard times recorded when not logged in
            discardBtn.addEventListener('click', () => {
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
                        setActiveTag()
                        updateTimeTable(timesInfoList)
                        $('#saveTimesPromptModal').modal('hide')
                    })
            })
            // On saveBtn click, concat the times recorded when not logged in onto the timesInfoList array
            saveBtn.addEventListener('click', () => {
                db.collection('users')
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        timesInfoList = doc.data().timesInfoList
                        timeTags = doc.data().timeTags
                        timesInfoList = timesInfoList.concat(unsavedTimes)
                        saveUserData()

                        // Add data to account modal
                        const accountModalNameInput = document.getElementById(
                            'accountModalNameInput'
                        )
                        const accountModalEmailInput = document.getElementById(
                            'accountModalEmailInput'
                        )
                        accountModalEmailInput.value = user.email
                        accountModalNameInput.value = doc.data().name
                        console.log('this is a test')
                        setActiveTag()
                        $('#saveTimesPromptModal').modal('hide')
                    })
            })
        }
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
        setActiveTag()
        updateTimeTable(timesInfoList)
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

    // Sign user up
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            console.log('signed up')
            return db.collection('users').doc(cred.user.uid).set({
                name: name,
                timesInfoList: [],
                timeTags: timeTags,
            })
        })
        .then(() => {
            const modal = document.querySelector('#signupModal')
            $(modal).modal('hide')
            signupForm.reset()
        })
})

// Loggin method
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
            { name: 'Main', color: '#fd483f', key: generateKey() },
            { name: 'School', color: '#f5df4f', key: generateKey() },
            { name: 'Work', color: '#3d3d90', key: generateKey() },
            { name: 'Exersice', color: '#b36b0e', key: generateKey() },
            { name: 'Chores', color: '#694214', key: generateKey() },
            { name: 'Projects', color: '#0a724f', key: generateKey() },
        ]
        updateTimeTable(timesInfoList)
    })
})
