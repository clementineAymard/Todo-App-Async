// import CMP from './'
export default {
    props:['todo'], 
    template: `
        <article :class="todoStatus">
            {{todo.task}}
        </article>
    `,
    computed:{
        todoStatus(){
            return this.todo.status
        }
    },
    watch:{
        
    },
    methods: {
        
    }
}