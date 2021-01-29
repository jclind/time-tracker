const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('#account-modal');

const setupUI = (user) => {
    console.log('helloasdf there')
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // Account info
            const accountHTML = `
                <div class="modal-title">Account Information</div>
                <div class="account-info-container">
                    <div class="account-modal-email-container account-info-item">
                        <h6>Email</h6>
                        <div class="acocunt-modal-email">${user.email}</div>
                    </div>
                    <div class="account-modal-name-container account-info-item">
                        <h6>Name</h6>
                        <div class="account-modal-name">${doc.data().name}</div>
                    </div>
                </div>
            `;
            accountDetails.innerHTML = accountHTML;
        })

        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')
        
    } else {
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')
    }
    onWindowLoad();
}

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        let count = 0;
        console.log('ehlasdfjjkkjekwkerkwerwer')
        db.collection('users').onSnapshot(snapshot => {
            db.collection('users').doc(user.uid).get().then(doc => {
                timesInfoList = doc.data().times;
                timeTags = doc.data().tags;
                // Only call setupUI on first snapshot
                if (count == 0) {
                    console.log('count is 0')
                    setupUI(user);
                }
                console.log(count)
                count++;
            })
        })
    } else { // Signout
        timesInfoList = [];
        timeTags = [{name: 'main', color: 'red'}];
        console.log('this is also where?')
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
        let timesArr = [];
        console.log('test')
        // Initialize name, times array, and tags array into the current signed up user's db
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['signup-name'].value,
            times: timesArr,
            tags: [{name: 'main', color: 'red'}]
        });
    }).then(() => {
        // Close signup modal
        closeNavModal('signup-modal');
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
        closeNavModal('login-modal');
    });
});



// Save data function
const saveUserData = () => {
    // Update necessary webpage elements
    // Update tags list
    updateTagsList();
    // Resort the times table elements and updates the time table
    sortTimeTable(currSortedRowName);
    // Re-update the times distribution graph
    updateTagDistributionGraph();

    // Save user's changed array data to firebase backend
    let currUser = firebase.auth().currentUser;
    db.collection('users').doc(currUser.uid).get().then(doc => {
        console.log('hello 1')
        db.collection('users').doc(currUser.uid).update({
            times: timesInfoList,
            tags: timeTags
        }).then(() => {
            console.log('saved data')
        })
    })


}
