// import CMP from './'
export default {
    // props:[], 
    template: `
    <section class="user-settings">
        <h1>User settings</h1>
        <div class="flex justify-evenly">
            <input type="color" name="bgColor" title="Background" v-model="settings.bgColor"/> | 
            <input type="color" name="txtColor" title="Text" v-model="settings.txtColor"/>
            <button @click="changeSettings">Save</button>
        </div>

    </section>
    `,
    data() {
        return {
            settings: {}
        }
    },
    methods: {
        changeSettings() {
            this.$store.dispatch({type: 'updateUser', settings: {...this.settings}})
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        fullname() {
            return this.$store.getters.fullname
        }
    },
    created() {
        this.settings = JSON.parse(JSON.stringify(this.$store.getters.settings))
        console.log('Hi settings')

    },
    // etc.
    // components:{},
}