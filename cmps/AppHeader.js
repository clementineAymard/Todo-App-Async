import LoginSignup from '../pages/LoginSignup.js'

export default {
    template: `
    <section class="app-header">
        <RouterLink class="logo" to="/">To-dos</RouterLink>

        <div v-if="user" class="progress-bar">
            {{fullname}}'s progress : <div id="myProgress">
            <div id="myBar" :style="'width:' + width + '%;'" href>{{width}}%</div>
            </div>
        </div>

        <div class="btn-ham-menu" @click="toggleMenu"></div>
        <nav :class="isMenuShownClass">
        
            <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
            <RouterLink to="/todo" v-if="user" @click="toggleMenu">Todos</RouterLink>
            <RouterLink to="/user" v-if="user" @click="toggleMenu">Account</RouterLink>
            
            <a v-if="user" @click="logout">Logout</a>
            <RouterLink to="/login" v-if="!user" @click="toggleMenu">Login / Signup</RouterLink>
        
        </nav>
    </section>
    `,
    data() {
        return {
            isMenuShown:false
        }
    },
    created(){
        this.$store.dispatch('getProgress')
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        fullname(){
            return this.$store.getters.fullname.split(' ')[0]
        },
        width() {
            return this.$store.getters.progress
        },
        isMenuShownClass(){
            return this.isMenuShown ? 'menu-open' : ''
        }
    },
    methods: {
        logout() {
            this.toggleMenu()
            this.$store.commit({ type: 'logout' })
        },
        toggleMenu(){
            this.isMenuShown = !this.isMenuShown
        }
    }
}