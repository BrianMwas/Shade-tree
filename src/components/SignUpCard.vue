<template>
        <v-card
          class="mx-auto rounded"
          max-width="450"
          min-width="290"
        >
          <v-img
              src="@/assets/Kander.png"
              height="80"
          ></v-img>
          <v-card-title class="title font-weight-regular justify-space-between">
            Register
          </v-card-title>
          <v-card-text>
              <v-form @submit.prevent="register">
                  
                    <v-text-field
                      name="email"
                      label="Email"
                      filled
                      v-model.trim="$v.email.$model"
                      id="email"
                      :error-messages="emailErrors"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                      required
                      type="email"
                      autocomplete="on"
                    ></v-text-field>
                   <v-text-field
                    name="password"
                    label="password"
                    filled
                    v-model.trim="$v.password.$model"
                    id="password"
                    :error-messages="passwordErrors"
                    :type="passwordShow ? 'text' : 'password'"
                    :append-icon="passwordShow ? passwordEyeCancel: passwordShowIcon"
                    @click:append="passwordShow = !passwordShow"
                    autocomplete="on"
                    required
                  ></v-text-field>
                   <v-text-field
                    name="confirmation"
                    label="Password Confirmation"
                    filled
                    v-model.trim="$v.confirmation.$model"
                    id="confirm"
                    :error-messages="confirmationErrors"
                    :type="confirmPassword ? 'text' : 'password'"
                    :append-icon="confirmPassword ? passwordEyeCancel: passwordShowIcon"
                    @click:append="confirmPassword = !confirmPassword"
                    autocomplete="on"
                    required
                  ></v-text-field>
                
                <v-btn outlined color="primary" dark type="submit" :disabled="submitStatus == 'OKAY' && submitStatus !== 'ERROR'" :loading="submitStatus === 'PENDING'">Register</v-btn>
              </v-form>
          </v-card-text>
        </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mdiEye, mdiEyeCheck } from '@mdi/js'
const { minLength, email, required, sameAs } = require('vuelidate/lib/validators')

export default {
    name: 'SignUp',
    data () {
        return {
            email: "",
            password: "",
            confirmation: "",
            submitStatus: null,
            passwordShow: false,
            confirmPassword: false,
            passwordShowIcon: mdiEye,
            passwordEyeCancel: mdiEyeCheck
        };
    },
    mixins:[validationMixin],
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        min: minLength(7)
      }, 
      confirmation : {
        required, 
        same: sameAs('password'),
        min: minLength(7)
      }
    },
    methods: {
      async clear() {
        this.email = this.password = this.confirmation = "";
      },
      async register () {
        let data = {
          email: this.email,
          password: this.password
        }

        this.$v.$touch();
        if(this.$v.$invalid) {
          this.submitStatus = "ERROR"
        } else {
          this.submitStatus = "PENDING";
          setTimeout(() => {
            this.submitStatus = "OK"
            console.log(data);
            this.confirmPassword = false;
            this.passwordShow = false;
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
      }, 
      passwordErrors() {
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
        return errors;
      },
      confirmationErrors () {
        const errors = [];
        if(!this.$v.confirmation.$dirty) {
          return errors
        } 

        if(!this.$v.confirmation.required) {
          errors.push('Please enter the confirmation password.')
        }

        if(!this.$v.confirmation.same) {
          errors.push('The passwords do not match')
        }

        return errors;
      }
    }
}
</script>

<style lang="scss" scoped>
    .v-divider {
        background: grey;
    }

    .rounded {
      border-radius: 10px !important;
    }
</style>