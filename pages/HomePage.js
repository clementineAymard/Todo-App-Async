// import { productService } from '../services/product.service.js'
import LoginSignup from '../cmps/LoginSignup.js'

export default {
    template: `
        <section class="home">
            <h1>Welcome <span>{{fullname}}</span> !</h1>
            <LoginSignup v-if="!user"/>
        </section>
    `,
    data() {
        return {
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
    components: {
        LoginSignup,
    }
}