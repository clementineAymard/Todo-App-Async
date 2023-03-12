export default {
    template: `
        <section class="user-space">
            <div class="user-details">
                <h1>{{fullname}}, your activities :</h1><br>
                <ul>
                    <li v-for="activity in user.activities">
                        {{activity.txt}} on {{new Date(activity.at)}} <br><br>
                    </li>
                </ul>
            </div>
            <RouterLink to="/user/settings">Change settings</RouterLink>
        </section>
    `,
    data() {
        return {
        }
    },
    created() {
       this.$store.commit('updateUser')
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        fullname(){
            return this.$store.getters.fullname
        }
    }
}