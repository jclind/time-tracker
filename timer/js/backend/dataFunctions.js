// !!Write
const saveUserData = () => {
    let currUser = firebase.auth().currentUser
    updateTimeTable(timesInfoList)
    if (currUser) {
        console.log('data saved')
        db.collection('users')
            .doc(currUser.uid)
            .get()
            .then(doc => {
                db.collection('users').doc(currUser.uid).update({
                    timesInfoList: timesInfoList,
                    timeTags: timeTags,
                })
            })
    } else {
        showLoginToSaveDataAlert()
    }
}
