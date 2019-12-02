<template>
    <div>
        <NavBar #default="defaultLinks">
        </NavBar>
        <NavBar v-if="loggedIn" #loggedInRoutes="loggedInRoutes"></NavBar>
        <v-content app>
            <v-container>
                <v-card>
                    <v-card-title>
                        Admin
                    </v-card-title>
                    <v-card-text>You must be an admin to view this..</v-card-text>
                </v-card>
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { mdiShieldLock } from '@mdi/js'

export default {
    name: 'Admin',
    components: {
        NavBar,
        Footer
    },
    data () {
        return {
            mdiShieldLock,
            loggedIn: false,
            defaultLinks : {
                link: 'Blog',
                link: 'Units',
                link: 'Log in',
                link: 'Sign up'
            },
            loggedInRoutes : {
                link: 'map',
                link: 'Add Unit',
                link: 'Add Agent',
                link: 'Log out'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>