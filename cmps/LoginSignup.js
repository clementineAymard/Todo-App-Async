import { showErrorMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"

export default {
    template: `
    <section class="login-signup">
        <h3>Login/Signup</h3>
        <form  @submit.prevent="login">
            <h2>Login</h2>
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
            <button>Login</button>
        </form>
        <hr />
        <form  @submit.prevent="signup">
            <h2>Signup</h2>
            <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
            <input type="text" v-model="signupInfo.username" placeholder="Username" />
            <input type="password" v-model="signupInfo.password" placeholder="Password" />
            <button>Signup</button>
        </form>
    </section>
    `,
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch({ type: 'login', credentials: { ...this.credentials } })
                .then(user => {
                    showSuccessMsg('Logged in')
                })
                .catch(err => {
                    showErrorMsg('Cannot Login')
                })
        },
        signup() {
            this.$store.dispatch({ type: 'signup', credentials: { ...this.signupInfo } })
                .then(user => {
                    showSuccessMsg('Signed up and logged in')
                })
                .catch(err => {
                    showErrorMsg('Cannot Signup/Login')
                })
        },
    }

}

