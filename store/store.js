const { createStore } = Vuex

import { todoStore } from './todo.store.js'
import { userStore } from './user.store.js'

const storeOptions = {
    strict: true,
    state() {return {}},
    mutations: {},
    actions: {},
    getters: {},
    modules : {
        todoStore,
        userStore,
    }
}

export const store = createStore(storeOptions)

store.subscribe((cmd, state) => {
    console.log('**** Store state changed: ****')
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
    console.log('*******************************')
})