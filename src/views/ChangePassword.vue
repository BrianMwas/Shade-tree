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
                        height="220"
                    >
                    <v-card-title primary-title>
                        Enter your email
                    </v-card-title>
                        <v-card-text>
                            <form @submit.prevent="changePasswordRequest">
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
                                <v-btn color="primary" type="submit" block>Send</v-btn>
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
        async changePasswordRequest() {
            let email = this.email;
            console.log("Email", email);
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
                setTimeout(() => {
                    this.submitStatus = "OK"
                    this.email = this.password = this.confirmation = "";
                    this.$v.$reset()
                }, 500)
            }
        }
    },
    computed: {
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