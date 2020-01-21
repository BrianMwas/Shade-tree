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
                        <v-toolbar-title class="white--text">{{ activationMessage }}</v-toolbar-title>
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
                            <v-img
                                src="@/assets/activation-success.png"
                                :aspect-ratio="1"
                                class="my-3"
                                contain
                            ></v-img>
                            <v-btn to="/login" color="success" class="text-center" block depressed>
                                Go to login
                            </v-btn>
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
        ...mapActions('auth', ["activate"]),
        ...mapActions('alert', ['errorAlert', 'successAlert']),
            getSuccessMessage () {
                console.log("userId", this.$route.params.userId)
            if(!this.$route.params.userId || this.$route.params.userId.length < 24) {
                this.$router.push("/login");
            } else {
                this.activate(this.$route.params.userId)         
            }
        }
    },
    computed: {
        ...mapState({
            Messages: state => state.alert.Messages.map(m => m.Raw),
            activationMessage: state => state.auth.activationSuccessMessage
        }),
    },
     watch: {
      $route : {
        immediate: true,
         handler(to, from) {
          this.getSuccessMessage()
        }
      }
    }
}
</script>