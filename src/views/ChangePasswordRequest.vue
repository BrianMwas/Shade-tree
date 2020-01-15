<template>
    <div>
         <NavBar v-if="loggedIn" #loggedInRoutes>
          <v-btn text>
           <router-link to="/map" class="link">map</router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/logout" class="link">Log out</router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/logout" class="link">Add Unit</router-link>
          </v-btn>
        </NavBar>
        <NavBar v-else #default>
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
                    <div 
                        v-if="Messages.length > 0" 
                    >
                        <v-alert 
                        class="my-5 mx-3" 
                        border="left" 
                        close-label="Close alert" 
                        :type="message.type" 
                        dismissible
                        v-for="message in Messages"
                        :key="message.mKey"
                        >
                            {{message.message}}
                        </v-alert>
                    </div>
                    
                    <v-card-title class="display-1">
                       Shade Tree
                    </v-card-title>
                    <v-card-subtitle>
                        Enter your email first
                    </v-card-subtitle>
                        <v-card-text>
                            <form @submit.prevent="changePassword">
                                <v-text-field
                                    name="email"
                                    label="Email"
                                    filled
                                    type="email"
                                    autocomplete="on"
                                    :error-messages="emailErrors"
                                    v-model.trim="$v.email.$model"
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                    required
                                ></v-text-field>
                                <v-btn 
                                color="primary" 
                                type="submit" 
                                block  
                                :disabled="submitStatus == 'OKAY' && submitStatus !== 'ERROR'" 
                                :loading="submitStatus === 'PENDING'">Send</v-btn>
                            </form>
                        </v-card-text>
                    </v-card>
                 </div>
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { validationMixin } from 'vuelidate'
const { required, minLength, email } = require('vuelidate/lib/validators')
import { mapActions, createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('alert');


export default {
    name: 'change-password',
    components: {
        NavBar,
        Footer
    },
    mixins: [validationMixin],
    data () {
        return  {
            email: "",
            submitStatus: null,
            loggedIn: false
        }
    },
    validations: {
        email:  {
            required,
            email
        }
    },
    methods: {
        ...mapActions('auth', ['changePasswordRequest']),
        changePassword() {
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
          
                this.submitStatus = "OK"
                console.log("email hope", this.email)

                this.changePasswordRequest(this.email)
                this.email = "";
                this.$v.$reset()
            }
        }
    },
    computed: {
        ...mapGetters(['Messages']),
        emailErrors () {
            const errors = [];
            if(!this.$v.email.$dirty) {
            return errors;
            } else if(!this.$v.email.email) {
            errors.push("Please enter a valid email address")
            } else if(!this.$v.email.required) {
            errors.push('Email is required')
            }

            return errors;
        }
    }
}
</script>

<style lang="scss" scoped>
.container.vh-100 {
    height: 67vh !important;
}
</style>