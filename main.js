'use strict'

const { createApp } = Vue

import { router } from './router.js'
import { store } from './store/store.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
    template: `
    <section class="main">
        <AppHeader :style="getStyleByUser"/>
        <RouterView/>
        <AppFooter  :style="getStyleByUser"/>
        <UserMsg/>
    </section>
    `,
    created(){

    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        getStyleByUser(){
            if (this.user) {
                console.log(this.user)
                
                return {
                    // color: this.user.settings.txtColor,
                    // background: this.user.settings.bgColor
                    background: this.user.settings.bgColor  || 'var(--clr-bg)',
                    color: this.user.settings.txtColor || 'var(--clr-txt-light)',
                }
            } else{} 
        }
    },
    components:{
        AppHeader,
        AppFooter,
        UserMsg
    },
}
const app = createApp(options)

app.use(router)
app.use(store)

app.mount('#app')