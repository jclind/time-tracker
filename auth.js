const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('#account-modal');

const setupUI = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // Account info
            const accountHTML = `
                <div id="account-modal-title">Hello ${doc.data().name}</div>
                <div id="account-modal-email">Logged in as ${user.email}</div>
            `;
            accountDetails.innerHTML = accountHTML;
        })

        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')


        // Toggle user's times list 
        console.log(timesInfoList)
        
    } else {
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')
        updateTimesList(timesInfoList);
    }
    onWindowLoad();
}

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            timesInfoList = doc.data().times;
            timeTags = doc.data().tags;
            setupUI(user);
        })
    } else {
        timesInfoList = [];
        timeTags = [{name: 'main', color: 'red'}];
        setupUI();
    }
})



// Signup 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('BING GONS')

    // Get user info
    const name = signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['signup-name'].value,
            times: [],
            tags: [{name: 'main', color: 'red'}]
        });
    }).then(() => {
        signupModalBtn();
    });
});


// Logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
})

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value; 

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // Close the login modal and reset the form
        loginModalBtn();
    });
});



// Save data function
const saveFirebaseData = () => {
    db.collection('users').doc(currUserId).set({
        times: timesInfoList,
        tags: timeTags
    }).then(() => {
        console.log('saved arrays')
    })
}