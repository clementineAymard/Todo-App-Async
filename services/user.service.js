import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// localStorage.clear()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    addActivity,
    updateUser,
}

_createUsers()

function getLoggedinUser() {
    const str = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return str
}

function login({ username, password }) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password)
            if (user) {
                return _saveUserToStorage(user)
            } else {
                return Promise.reject('Invalid credentials')
            }
        })
}

function _saveUserToStorage(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve()
}

function signup({ fullname, username, password }) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(u => u.username === username)
            if (user) return Promise.reject('Username already taken')
            return storageService.post(USER_KEY, _createUser(fullname, username, password))
                .then(user => {
                    return _saveUserToStorage(user)
                })
        })
}

function addActivity(activity) {
    var user = getLoggedinUser()
    user.activities.push(activity)
    return storageService.put(USER_KEY, user)
        .then(savedUser => {
            _saveUserToStorage(savedUser)
            return savedUser
        })
}

function updateUser({ txtColor, bgColor }) {
    let user = getLoggedinUser()
    user.settings.bgColor = bgColor
    user.settings.txtColor = txtColor
    return storageService.put(USER_KEY, user)
        .then(savedUser => {
            _saveUserToStorage(savedUser)
            return savedUser
        })
}

function getEmptyUser() {
    return {
        fullname: '',
        username: '',
        password: '',
        balance: 0,
        activities: [],
        settings: {}
    }
}

function _createUsers() {
    var users = utilService.loadFromStorage(USER_KEY)
    if (!users || !users.length) {
        users = [
            _createUser('Clem Aymard', 'Clem', '258', 2500, [{ txt: 'Added a todo', at: Date.now() }]),
            _createUser('Yossef Aymard', 'Yo', '321', 13000, [{ txt: 'Added a todo', at: Date.now() - 286000 }, { txt: 'Removed a todo', at: Date.now() - 62000 }])
        ]
        utilService.saveToStorage(USER_KEY, users)
    }
    return users
}

function _createUser(fullname, username, password, balance = 0, activities = []) {
    return {
        fullname,
        username,
        password,
        balance,
        activities,
        settings: { txtColor: '', bgColor: '' }
    }
}