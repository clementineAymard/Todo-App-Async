import { todoService } from "../services/todo.service.js"

// import CMP from './'
export default {
    // props:[], 
    template: `
        <section class="todo-details">
            <RouterLink to="/todo">Back to to-do list</RouterLink>
            <div class="details flex-column">

                <div><span>Task: </span>{{todo.task}}</div>
                <div><span>Date created: </span>{{date}}</div>
               <div class="cap"><span>Status :  </span>{{todo.status}}</div>

            </div>
        </section>
    `,
    data() {
        return {}
    },
    created(){
        this.$store.dispatch({type:'setCurrTodo', todoId: this.$route.params.todoId})
    },
    methods: {},
    computed: {
        todo(){
            return this.$store.getters.currTodo
        },
        date(){
            var formattedDate = new Date(this.todo.createdAt)
            // console.log(formattedDate)
            const option = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                // hour12: false,
            }
            return new Intl.DateTimeFormat('en', option).format(formattedDate)
        }
    },
    // etc.
    // components:{},
}