<template>
    <div>
        <NavBar #default>
            <v-btn text>
              <router-link to="/units" class="link">units</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/login" class="link">log in</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/signup" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>
        <v-content dark transition="fade-transition" app>
            <v-container class="vh-100">
                
                <div class="d-flex" justify="center" style="margin: 4.6em auto">
                    

                    <v-card
                        class="mx-auto rounded"
                        width="400"
                        min-width="290"
                        flat
                        min-height="220"
                    >
                    
                    
                    <v-toolbar color="green lighten-1">
                        <v-toolbar-title class="white--text">Account activation success</v-toolbar-title>
                    </v-toolbar>
                        <v-card-text class="py-3">
                            <div 
                                v-if="Messages.length > 0" 
                            >
                                <v-alert 
                                class="my-5 mx-3" 
                                border="left" 
                                close-label="Close alert" 
                                :type="message.type" 
                                dismissible
                                v-for="message in messages"
                                :key="message.mKey"
                                >
                                    {{message.message}}
                                </v-alert>
                            </div>
                            <p class="heading grey--text text--darken-4 text-center"><span class="blue--text text--lighten-3">{{ activationMessage }}</span> redirecting towards login...</p>
                            <p class="grey--text text--darken-3 mt-5">Go back to <router-link to="/login" class="green--text">login now</router-link></p>
                        </v-card-text>
                    </v-card>
                 </div>
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { mapActions, mapState } from 'vuex'
export default {
    components: {
        NavBar,
        Footer
    },
    methods: {
        ...mapActions('auth', ["activation"]),
        ...mapActions('alert', ['errorAlert']),
            getSuccessMessage () {
            if(!this.$route.params.userId || this.$route.params.userId.length < 24) {
                this.$router.push("/login");
                this.errorAlert({
                    mKey: Math.floor(Math.random() * Math.floor(20)),
                    messages: "Invalid link. Use the link sent to your email",
                    type: "error"
                })
            } else {
                this.activation(this.$route.params.userId)                
            }
        }
    },
    computed: {
        ...mapState({
            messages: state => state.alert.Messages,
            activationMessage: state => state.auth.activationSuccessMessage
        }),
    },
    created () {
        this.getSuccessMessage()
    }
}
</script>