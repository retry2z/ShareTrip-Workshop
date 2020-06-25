module.exports = class Account {
    constructor(data) {
        this._email = data.email || ''
        this._password = data.password || ''
        this.uid = data.uid || false
    }

    set _email(data) {
        const patternLength = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
        if (!patternLength.test(data)) {
            throw new TypeError('Invalid email address');
        }
        this.email = data;
    }

    set _password(data) {
        const pattern = /\w{6,}/g;
        if (pattern.test(data)) {
            this.password = data;
        } else {
            throw new TypeError('Password must have 6 symbols at least');
        }
    }
}
