// import CMP from './'
export default {
    // props:[], 
    template: `
    <section class="filter-sort-todos flex">
                <form  class="filter-todos">
                    Filter : 
                    <input type=text v-model="filterBy.txt" placeholder="Search..." @input.prevent="setFilterBy">
                     | 
                    <select v-model="filterBy.status" @change.prevent="setFilterBy">
                        <option value="all" selected>All</option>
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                    </select> <br>
                </form>
                <form @change.prevent="setSortBy" class="sort-todos flex align-center justify-between">
                    Sort :
                    <select v-model="sortBy.order">
                        <option value="-1" selected>Newest first</option>
                        <option value="1">Oldest first</option>
                    </select>
                </form>
            </section>
    `,
    data() {
        return {
            filterBy: { status: 'all', txt: '' },
            sortBy: { order: -1 }
        }
    },
    methods: {
        setFilterBy() {
            this.$emit('setFilterBy', { ...this.filterBy })
        },
        setSortBy() {
            this.$emit('setSortBy', { ...this.sortBy })
        }
    },
    computed: {},
    // created(){},
    // etc.
    // components:{},
}