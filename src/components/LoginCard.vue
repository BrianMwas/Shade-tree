<template>
    <v-card
        class="mx-auto rounded"
        max-width="450"
        min-width="290"
    >
        <v-img
            src="@/assets/Thur.png"
            height="80"
        ></v-img>
        <v-card-title class="title font-weight-regular justify-space-between">
            Login    
        </v-card-title>
        <v-alert 
        class="my-5 mx-3" 
        border="left" 
        close-label="Close alert" 
        v-if="Messages.length > 0" 
        :type="message.type" 
        dismissible
        v-for="message in Messages"
        :key="message.mKey"
        >
            {{message.message}}
        </v-alert>
        <v-card-text>
            <form @submit.prevent="login">
                <v-text-field
                    label="Email"
                    type="email"
                    filled
                    autocomplete="on"
                    :error-messages="emailErrors"
                    v-model.trim="$v.email.$model"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    required
                ></v-text-field>
                <v-text-field
                    label="Password"
                    filled
                    autocomplete="on"
                    v-model.trim="$v.password.$model"
                    :error-messages="passwordErrors"
                    :type="passwordShow ? 'text' : 'password'"
                    :append-icon="passwordShow ? passwordCancel: passwordEye"
                    @click:append="passwordShow = !passwordShow"
                    required
                ></v-text-field>
                <v-btn depressed color="success" type="submit" :disabled="submitStatus !== 'OKAY' && submitStatus === 'ERROR'" :loading="submitStatus === 'PENDING'">Login</v-btn>
                 <div class="my-3">
                     <router-link to="signup" class="text-center d-flex">Don't have an account? Sign Up here</router-link>
                    <router-link to="change-password-request" class="text-center">Forgot password? Change It here</router-link>
                 </div>
                    
               
            </form>
        </v-card-text>
  </v-card>
</template>

<script>
import { mdiEye, mdiEyeCheck } from '@mdi/js'
import { validationMixin } from 'vuelidate'
const { required, minLength, email } = require('vuelidate/lib/validators')
import { createNamespacedHelpers, mapActions } from 'vuex';

const { mapGetters } = createNamespacedHelpers('alert');


export default {
    name: 'Login',
    mixins: [validationMixin],
    data () {
        return {
            email: "",
            password: "",
            passwordEye: mdiEye,
            passwordCancel: mdiEyeCheck,
            passwordShow: false,
            submitStatus: null
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            min: minLength(7)
        }
    },
    methods: {
        ...mapActions('auth', ['loginUser']),
        async login () {
            let data = {
                email: this.email,
                password: this.password
            };
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
                
                this.submitStatus = "OK"
                this.loginUser(data)
                this.email = this.password = this.confirmation = "";
                this.$v.$reset()
            }
        }
    },
    computed : {
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
        },
        passwordErrors () {
            const errors = [];
            if(!this.$v.password.$dirty) {
                return errors
            }
            if(!this.$v.password.required) {
            errors.push('A password is required...')
            }

            if(!this.$v.password.min) {
            errors.push("Please enter a minimum of 7 characters")
            }
            return errors
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-divider {
        background: aquamarine;
    }

    .rounded {
        border-radius: 10px !important;
    }

    .d-block {
        display: block !important;
    }
</style>