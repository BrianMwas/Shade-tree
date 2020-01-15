<template>
    <div>
        
        <NavBar #default>
            <v-btn text>
              <router-link to="/units" class="link">units</router-link>
            </v-btn>
           <v-btn text>
              <router-link to="/blog" class="link">Blog</router-link>
            </v-btn>
            
            <v-btn text>
              <router-link to="/login" class="link">log in</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/signup" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>
        <v-content dark transition="fade-transition" app>
            <v-container style="min-height: 66vh">
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
import { mapState } from 'vuex'


export default {
    name: 'LogIn',
    components:{
        NavBar,
        LoginCard,
        Footer
    },
    data () {
        return {
            mdiShieldLock,
            loggedIn: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .h-100 {
        min-height: 100%;
    }
</style>