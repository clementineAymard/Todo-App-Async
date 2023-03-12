const { createRouter, createWebHashHistory } = VueRouter

import HomePage from './pages/HomePage.js'
import LoginSignup from './pages/LoginSignup.js'
import TodoIndex from './pages/TodoIndex.js'
import TodoEdit from './pages/TodoEdit.js'
import TodoDetails from './pages/TodoDetails.js'
import UserDetails from './pages/UserDetails.js'
import UserSettings from './pages/UserSettings.js'

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/login',
        component: LoginSignup,
    },
    {
        path: '/todo',
        component: TodoIndex,
    },
    {
        path: '/todo/edit/:todoId',
        component: TodoEdit
    },
    {
        path: '/todo/:todoId',
        component: TodoDetails
    },
    {
        path: '/user',
        component: UserDetails,
    },
    {
        path: '/user/settings',
        component: UserSettings,
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})