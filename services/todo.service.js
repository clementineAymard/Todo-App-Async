import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const TODO_KEY = 'todosDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    toggleStatus,
    getProgress,
}

_createTodos()

function query({ filterBy, sortBy }) { // 
    var user = userService.getLoggedinUser()
    if (user) var username = user.username

    return storageService.query(TODO_KEY)
        .then(todos => {
            todos = todos.filter(todo => todo.ownerUsername === username)
            if (filterBy.status !== 'all')
                todos = todos.filter(todo => todo.status === filterBy.status)
            var regex = new RegExp(filterBy.txt, 'i')
            todos = todos.filter(todo => regex.test(todo.task))
            todos = todos.sort((t1, t2) => (t1.createdAt - t2.createdAt) * sortBy.order)
            return todos
        })
}

function getById(id) {
    return storageService.get(TODO_KEY, id)
}

function remove(id) {
    return storageService.remove(TODO_KEY, id)
        .then(() => console.log('service removed todo'))
        .catch(err => {
            console.log('service failed remove todo', err)
            throw err
        })
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        return storageService.post(TODO_KEY, todo)
    }
}

function toggleStatus(todoId) {
    return storageService.get(TODO_KEY, todoId)
        .then(todo => {
            todo.status = todo.status === 'active' ? 'done' : 'active'
            return save(todo)
        })
        .catch(err => {
            console.log('failed to get todo')
            throw err
        })
}

function getProgress() {
    var user = userService.getLoggedinUser()
    if (user) var username = user.username
    return storageService.query(TODO_KEY)
        .then(todos => {
            todos = todos.filter(todo => todo.ownerUsername === username)
            var countDone = todos.filter(todo => todo.status === 'done').length
            var countTotal = todos.length
            return Math.round(100 * countDone / countTotal)
        })
}

// function _update(todo) {
//     const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
//     gTodos.splice(idx, 1, todo)
//     userService.addActivity('Updated a todo')
//     return todo
// }


// ---------------------------------------------------------------------------------------------------------------------------------------//


function _createTodos() {
    var todos = utilService.loadFromStorage(TODO_KEY)
    if (!todos || !todos.length) {
        todos = [_createTodo(utilService.makeId(), 'Exercise Vuex', 1678624789674, 'Clem'), _createTodo(utilService.makeId(), 'Finish this project ASAP', 1678624879675, 'Clem'), _createTodo(utilService.makeId(), 'Do laundry', 1678624799676, 'Clem'),
        _createTodo(utilService.makeId(), 'Exercise', 1678624769677, 'Yo'), _createTodo(utilService.makeId(), 'Finish work', 1678624799675, 'Yo'), _createTodo(utilService.makeId(), 'Learn daf', 1678624769673, 'Yo')]
        utilService.saveToStorage(TODO_KEY, todos)
    }
    return todos
}

function _createTodo(_id, task, createdAt = Date.now(), ownerUsername) {
    return {
        _id,
        task,
        status: 'active',
        createdAt,
        ownerUsername
    }
}


function getEmptyTodo() {
    return {
        _id: '',
        task: '',
        status: 'active',
        createdAt: ''
    }
}