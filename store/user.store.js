import { userService } from '../services/user.service.js'

export const userStore = {
    strict: true,
    state() {
        return {
            user: userService.getLoggedinUser(),
        }
    },
    mutations: {
        logout(state) {
            userService.logout()
            state.user = userService.getLoggedinUser()
        },
        signup(state, { signupInfo }) {

        },
        addActivity(state, { activity }) {
            if (state.user) state.user.activities.push(activity)
        },
        updateUser(state, { settings }) {
            if (state.user) state.user.settings = settings
        }
    },
    actions: {
        login({ commit }, { credentials }) {
            return userService.login(credentials)
                .then(user => { commit({ type: 'updateUser', user: user }) })
                .catch(err => {
                    console.log('Login failed', err)
                })
        },
        addActivity({ commit }, { activity }) { // updates service then state with commit
            activity = { txt: activity, at: Date.now() }
            return userService.addActivity(activity)
                .then(() => commit({ type: 'addActivity', activity: activity }))
                .catch(err => {
                    console.log('Failed to add activity')
                    throw err
                })
        },
        updateUser({ commit }, { settings }) {
            return userService.updateUser(settings)
                .then(savedUser => {
                    commit({ type: 'updateUser', settings: settings })
                })
                .catch(err => {
                    console.log('Failed to update user settings')
                    throw err
                })
        },
    },
    getters: {
        user(state) {
            if (state.user) return state.user
        },
        username(state) {
            if (state.user) return state.user.username
        },
        fullname(state) {
            if (state.user) return state.user.fullname
        },
        settings({ user }) {
            return user.settings
        }
    }

}