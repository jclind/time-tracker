const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = user => {
    if (user) {
        // db.collection('users').doc(user.uid).get().then(doc => {
        //     // Account info
        //     const accountHTML = `
        //         <div><h1>${user.email}</h1></div>
        //     `
        // })
        loggedInLinks.forEach(item => (item.style.display = 'block'))
        loggedOutLinks.forEach(item => (item.style.display = 'none'))
    } else {
        // Toggle UI elements
        loggedInLinks.forEach(item => (item.style.display = 'none'))
        loggedOutLinks.forEach(item => (item.style.display = 'block'))
    }
}
