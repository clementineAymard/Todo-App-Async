import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"

// import CMP from './'
export default {
    // props:[], 
    template: `
    <section class="todo-edit">
    <RouterLink to="/todo">Back to to-do list</RouterLink>
        <div>
            Edit task : 
            <input type="text" v-model="newTodo.task">
            <button @click="editTodo">Save change</button>
        </div>
    </section>
    `,
    data() {
        return {
            newTodo: {}
        }
    },
    created() {
        this.$store.dispatch({ type: 'setCurrTodo', todoId: this.$route.params.todoId })
            .then(() => this.newTodo = { ...this.$store.getters.currTodo })
        // .catch(err => { throw err })
    },
    methods: {
        editTodo() {
            this.$store.dispatch({ type: 'editTodo', newTodo: { ...this.newTodo } })
                .then(() => {
                    showSuccessMsg('Edited todo')
                    this.$router.push('/todo')
                })
                .catch(err => showErrorMsg('Failed to edit todo', err))

        }
    },
    computed: {},
    // etc.
    // components:{},
}