const { createRouter, createWebHashHistory } = VueRouter

import HomePage from './pages/HomePage.js'
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
        component: HomePage,
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