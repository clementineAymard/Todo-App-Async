import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'

import TodoAdd from '../cmps/TodoAdd.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoList from '../cmps/TodoList.js'


export default {
    template: `
        <section class="todo-app" v-if="user">
            <TodoFilter 
                @setFilterBy="onSetFilterBy" 
                @setSortBy="onSetSortBy"/>

            <TodoAdd 
                @addTodo="onAddTodo"
                />
                
            <TodoList 
                :todos="todos" 
                @removeTodo="onRemoveTodo"
                @toggleTodoStatus="onToggleTodoStatus"/>   
                     
        </section>

        <section v-else>
            <RouterLink to="/" class="no-user">Login/Sign-up</RouterLink>
        </section>
    `,
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch('loadTodos')
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        todos() {
            return this.$store.getters.todosForDisplay
        },
    },
    methods: {
        onSetFilterBy(filterBy) {
            this.$store.dispatch({ type: 'setFilterBy', filterBy: filterBy })
        },
        onSetSortBy(sortBy) {
            this.$store.dispatch({ type: 'setSortBy', sortBy: sortBy })
        },
        onAddTodo(newTask) {
            this.$store.dispatch({ type: 'addTodo', newTask })
                .then(todo => showSuccessMsg('Successfully added todo'))
                .catch(err => showErrorMsg('Failed to add todo'))
        },
        onRemoveTodo(todoId) {
            this.$store.dispatch({ type: 'removeTodo', todoId:todoId })
                .then(todo => showSuccessMsg('Successfully removed todo'))
                .catch(err => showErrorMsg('Failed to remove todo'))
        },
        onToggleTodoStatus(todoId) {
            this.$store.commit({ type: 'toggleStatus', todoId })
        },
    },
    components: {
        TodoAdd,
        TodoFilter,
        TodoList,
    }
}