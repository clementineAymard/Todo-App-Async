// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex


import { storageService } from './storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo
}
// localStorage.clear()
var gTodos = _createTodos()

function query() { // { filterBy, sortBy }
    var user = userService.getLoggedinUser()
    if (user) var username = user.username
    console.log(user)

    var todos = JSON.parse(JSON.stringify(gTodos)).filter(todo => todo.ownerUsername === username)
    console.log(todos)

    // todos = todos.filter(todo => todo.status === filterBy.status)
    // todos = todos.sort((t1, t2) => (t1.createdAt - t2.createdAt) * sortBy.order)

    return todos
}

function getById(id) {
    // console.log('getById', id, gTodos)
    return gTodos.find(todo => todo._id === id)
}

function remove(id) {
    const idx = gTodos.findIndex(todo => todo._id === id)
    gTodos.splice(idx, 1)
    storageService.store(KEY, gTodos)
    userService.addActivity('Removed a todo')
}

function save(todo) {
    const todoToSave = JSON.parse(JSON.stringify(todo))
    const savedTodo = (todoToSave._id) ? _update(todoToSave) : _add(todoToSave)

    storageService.store(KEY, gTodos)
    return savedTodo
}

function _add(todo) {
    const currUser = userService.getLoggedinUser()
    const newTodo = _createTodo(todo.task, currUser.username)
    gTodos.push(newTodo)
    userService.addActivity('Added a todo')
    return newTodo
}

function _update(todo) {
    const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
    gTodos.splice(idx, 1, todo)
    userService.addActivity('Updated a todo')
    return todo
}

function getEmptyTodo() {
    return {
        _id: '',
        task: '',
        status: 'active',
        createdAt: ''
    }
}

function _createTodos() {
    var todos = storageService.load(KEY)
    if (!todos || !todos.length) {
        todos = [_createTodo('Exercise Vuex', 'Clem'), _createTodo('Finish this project ASAP', 'Clem'), _createTodo('Do laundry', 'Clem'),
        _createTodo('Exercise', 'Yo'), _createTodo('Finish work', 'Yo'), _createTodo('Learn daf', 'Yo')]
        storageService.store(KEY, todos)
    }
    return todos
}

function _createTodo(task, ownerUsername) {
    return {
        _id: utilService.makeId(),
        task,
        status: 'active',
        createdAt: Date.now(),
        ownerUsername
    }
}

