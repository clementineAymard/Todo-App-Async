import { todoService } from '../services/todo.service.js'

export const todoStore = {
    strict: true,
    state() {
        return {
            filterBy: { status: 'all' },
            sortBy: { order: -1 },
            todos: [],
            currTodo: {},
            progress: '',
        }
    },
    mutations: {
        setTodos(state, { todos }) {
            state.todos = todos
        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setSortBy(state, { sortBy }) {
            state.sortBy = sortBy
        },
        setCurrTodo(state, { todo }) {
            state.currTodo = { ...todo }
        },
        setProgress(state, { progress }) {
            state.progress = progress
        }
    },
    actions: {
        loadTodos({ commit, state }) {
            // console.log('loading', state.filterBy, state.sortBy)
            todoService.query({ filterBy: state.filterBy, sortBy: state.sortBy })
                .then(todos =>
                    commit({ type: 'setTodos', todos: JSON.parse(JSON.stringify(todos)) }))
                .catch(err => {
                    console.log('Failed to load todos', err)
                    throw err
                })
        },
        setFilterBy({ commit, state, dispatch }, { filterBy }) {
            console.log('filtering')
            commit({ type: 'setFilterBy', filterBy: filterBy })
            dispatch('loadTodos')
                .then(todos =>
                    commit({ type: 'setTodos', todos: todos }))
                .catch(err => {
                    console.log('Failed to load todos')
                    throw err
                })
        },
        setSortBy({ commit, dispatch }, { sortBy }) {
            commit({ type: 'setSortBy', sortBy: sortBy })
            dispatch('loadTodos')
                .then(todos =>
                    commit({ type: 'setTodos', todos: todos }))
                .catch(err => {
                    console.log('Failed to load todos')
                    throw err
                })
        },
        addTodo({ commit, dispatch, getters }, { newTask }) {
            const todo = {
                task: newTask,
                createdAt: Date.now(),
                status: 'active',
                ownerUsername: getters.username
            }

            return todoService.save(todo)
                .then(savedTodo => {
                    // console.log(savedTodo)
                    dispatch('loadTodos')
                        .then(() => {
                            dispatch({ type: 'addActivity', activity: 'Added a todo' })
                        })
                })
                .catch(err => {
                    console.log('Failed to add todo')
                    throw err
                })
        },
        removeTodo({ dispatch }, { todoId }) {
            return todoService.remove(todoId)
                .then(() => {
                    dispatch('loadTodos')
                        .then(() => {
                            dispatch({ type: 'addActivity', activity: 'Removed a todo' })
                            console.log('loaded todos')
                        })
                        .catch(err => { throw err })
                    console.log('removed todo')
                })
                .catch((err) => { throw err })
        },
        editTodo(context, { newTodo }) {
            newTodo.updatedAt = Date.now()
            console.log(newTodo)
            return todoService.save(newTodo)
                .then(() => {
                    console.log('Succesfully saved todo')
                    dispatch({ type: 'addActivity', activity: 'Added a todo' })
                })
                .catch(err => {
                    console.log('Failed to save todo')
                    throw err
                })
        },
        toggleStatus({ dispatch }, { todoId }) {
            return todoService.toggleStatus(todoId)
                .then(() => {
                    dispatch('loadTodos')
                    dispatch('getProgress')
                })
                .catch(err => {
                    console.log('failed to toggle status')
                    throw err
                })
        },
        setCurrTodo({ commit }, { todoId }) {
            return todoService.getById(todoId)
                .then((todo) => {
                    commit({ type: 'setCurrTodo', todo: todo })
                })
                .catch(err => { throw err })
        },
        getProgress({ commit }) {
            return todoService.getProgress()
                .then(progress => {
                    commit({ type: 'setProgress', progress: progress })
                })
                .catch(err => {
                    console.log('failed to get counts')
                    throw err
                })
        },
    },
    getters: {
        todosForDisplay({ todos }) {
            return todos
        },
        progress({ progress }) {
            return progress
        },
        currTodo({ currTodo }) {
            return currTodo
        }
    }
}