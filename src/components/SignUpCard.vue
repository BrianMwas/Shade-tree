<template>
        <v-card
          class="mx-auto rounded"
          max-width="450"
          min-width="290"
          flat
        >
          <v-img
              src="@/assets/Kander.png"
              height="80"
          ></v-img>
          <v-alert
          v-if="Messages.length > 0"
          v-for="message in Messages" 
          :key="message.type" 
          :type="message.type" 
          class="my-5 mx-3" 
          border="left" 
          close-label="Close alert" 
          dismissible>
            {{ message.message }}
          </v-alert>
          <v-card-title class="title font-weight-regular justify-space-between">
            Register
          </v-card-title>
          <v-card-subtitle v-if="$route.query.userType">You are registering as {{ $route.query.userType }}</v-card-subtitle>
          <v-card-text>
              <v-form @submit.prevent="register">
                    <v-text-field
                      name="username"
                      label="Username"
                      outlined
                      v-model.trim="$v.username.$model"
                      id="username"
                      :error-messages="usernameErrors"
                      @input="$v.username.$touch()"
                      @blur="$v.username.$touch()"
                      required
                      type="text"
                      autocomplete="on"
                    ></v-text-field>
                    <v-text-field
                      name="email"
                      label="Email"
                      outlined
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
                    outlined
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
                    outlined
                    v-model.trim="$v.confirmation.$model"
                    id="confirm"
                    :error-messages="confirmationErrors"
                    :type="confirmPassword ? 'text' : 'password'"
                    :append-icon="confirmPassword ? passwordEyeCancel: passwordShowIcon"
                    @click:append="confirmPassword = !confirmPassword"
                    autocomplete="on"
                    required
                  ></v-text-field>
        
                <v-btn 
                  color="primary" 
                  dark type="submit" 
                  :disabled="submitStatus == 'OKAY' && submitStatus !== 'ERROR' && submitStatus == 'null'" 
                  :loading="submitStatus === 'PENDING' && status.registering"
                  >Sign Up</v-btn>
                <div class="text-center mt-5">
                   Already a member? <router-link to="login" color="blue" class="link"> <span class="text-bold">Sign in here</span></router-link>
                </div>
              </v-form>
              <p class="blue--text text-center">By Signing up you agree to our terms and conditions</p>
          </v-card-text>
        </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mdiEye, mdiEyeCheck } from '@mdi/js'
const { minLength, email, required, sameAs, alphaNum, maxLength } = require('vuelidate/lib/validators')
import { mapState, mapActions } from 'vuex'
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('alert')

export default {
    name: 'SignUp',
    data () {
        return {
            email: "",
            password: "",
            username: "",
            confirmation: "",
            termsCheck: false,
            submitStatus: null,
            passwordShow: false,
            confirmPassword: false,
            passwordShowIcon: mdiEye,
            passwordEyeCancel: mdiEyeCheck,
        
        };
    },
    mixins: [validationMixin],
    validations: {
      username: {
        required,
        alphaNum,
        min: minLength(3),
        max: maxLength(30)
      },
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
      },
      termsCheck : {
        required
      }
    },
    methods: {
      ...mapActions('auth', ['registerUser']),
      async clear() {
        this.email = this.password = this.confirmation = "";
      },
      async register () {
         let data = {
          username: this.username,
          userType: this.$route.query.userType,
          email: this.email,
          password: this.password
        }
        this.$v.$touch();
        if(this.$v.$invalid) {
          this.submitStatus = "ERROR"
        } else {
            this.submitStatus = "PENDING";
            this.registerUser(data);

            this.confirmPassword = false;
            this.passwordShow = false;
            this.email = this.password = this.confirmation = "";
            this.$v.$reset()
          
        }
      }
    },
    computed: {
      ...mapState({
          status: state => state.auth.status
       }),
      ...mapGetters(['Messages']),

      usernameErrors () {
        const errors = [];
        if(!this.$v.username.$dirty) {
          return errors;
        } else if(!this.$v.username.alphaNum) {
          errors.push("Please enter a valid username.eg alpha123")
        } else if(!this.$v.username.required) {
          errors.push('Email is required')
        } else if(!this.$v.username.min) {
          errors.push('Username requires a minimum of 3 characters')
        } else if(!this.$v.username.max) {
          errors.push('Username requires a maximum of 30 characters')
        }

        return errors;
      },
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
      },
      checkboxErrors () {
        const errors = [];
        if(!this.$v.termsCheck.$dirty) {
          return errors;
        }

        if(!this.$v.termsCheck.required) {
          errors.push("You must agree to continue")
        }

        return errors;
      }
      
    }
}
</script>

<style lang="scss" scoped>
  .link {
    color: rgb(25, 82, 189);
    &:hover {
      color: rgb(15, 68, 136) !important;
    }
  }

    .v-divider {
        background: grey;
    }


    .text-bold {
      font-weight: bolder;
    }
    .rounded {
      border-radius: 10px !important;
    }

    .text-left {
      text-align: left;
      margin: 10px 0 15px;
      text-decoration: underline;
    }
</style>