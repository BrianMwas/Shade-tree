<template>
    <div>
        <NavBar/>
        <v-content app>
            <v-container>
                <div class="d-flex"
                    justify="center"
                    style="margin: 4.6em auto;"
                >
                    <LoginCard/>
                </div>
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import { mdiShieldLock } from '@mdi/js'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import LoginCard from '@/components/LoginCard.vue'


export default {
    name: 'LogIn',
    components:{
        NavBar,
        LoginCard,
        Footer
    },
    data () {
        return {
            mdiShieldLock
        }
    }
}
</script>

<style lang="scss" scoped>
    .h-100 {
        min-height: 100%;
    }
</style>