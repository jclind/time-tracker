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

        // Add data to account modal
        const accountModalNameInput = document.getElementById(
            'accountModalNameInput'
        )
        const accountModalEmailInput = document.getElementById(
            'accountModalEmailInput'
        )
        db.collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                accountModalNameInput.value = doc.data().name
            })
        accountModalEmailInput.value = user.email
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
            return db.collection('users').doc(cred.user.uid).set({
                name: name,
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
    auth.signOut().then(() => {})
})
