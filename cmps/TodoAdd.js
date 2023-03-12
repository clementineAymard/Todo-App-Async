export default {
    // props:[], 
    template: `
            <section class="add-todo">
                <form @submit.prevent="addTodo">
                    <input type="text" v-model="newTask" placeholder="What needs to be done ?">
                    <button title="Add to list">+</button>
                </form>
            </section>
            `,
    data() {
        return {
            newTask: ''
        }
    },
    methods: {
        addTodo() {
            this.$emit('addTodo', this.newTask)
            this.newTask = ''
        }
    },
}