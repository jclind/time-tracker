// !!Write
const saveUserData = () => {
    let currUser = firebase.auth().currentUser
    if (currUser) {
        console.log('data saved')
        updateTimeTable(timesInfoList)
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
        console.log('not logged in!')
    }
}
