const generateKey = () => {
    let key = 'KEY'
    let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 20; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return key
}
