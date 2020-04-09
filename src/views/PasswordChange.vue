<template>
	<div>
		<v-content app dark>
			<v-container>
		<div class="d-flex center">
					<v-card 
					class="mx-a my-5" 

					max-width="450"
	          		min-width="290">
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
					<v-card-title class="heading">Shade Tree</v-card-title>
					<v-card-subtitle>Change password</v-card-subtitle>
					<v-card-text>
						<v-form @submit.prevent="changePassword">
							<v-text-field
		                    name="password"
		                    label="New password"
		                    outlined
		                    v-model.trim="$v.newPassword.$model"
		                    id="newPassword"
		                    :error-messages="newPasswordErrors"
		                    :type="passwordShow ? 'text' : 'password'"
		                    :append-icon="passwordShow ? passwordEyeCancel: passwordShowIcon"
		                    @click:append="passwordShow = !passwordShow"
		                    autocomplete="on"
		                    required
		                    color="success"
		                  ></v-text-field>
		                   <v-text-field
		                    name="confirmation"
		                    label="Password Confirmation"
		                    outlined
		                    v-model.trim="$v.repeatPassword.$model"
		                    id="repeatPassword"
		                    :error-messages="repeatPasswordErrors"
		                    :type="passwordShow ? 'text' : 'password'"
		                    :append-icon="passwordShow ? passwordEyeCancel: passwordShowIcon"
		                    @click:append="repeatPassword = !repeatPassword"
		                    autocomplete="on"
		                    required
		                    color="success"
		                  ></v-text-field>
		                  <v-btn 
		                  color="green darken-1 rounded" 
		                  depressed
		                  dark type="submit" 
		                  :disabled="submitStatus == 'OKAY' && submitStatus !== 'ERROR' && submitStatus == 'null'" 
		                  :loading="submitStatus === 'PENDING'"
		                  >Change password</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
		</div>
			

			</v-container>
		</v-content>
	</div>
</template>

<script>

	import { validationMixin } from 'vuelidate'
	import { mdiEye, mdiEyeCheck } from '@mdi/js'
	const { minLength, email, required, sameAs, alphaNum, maxLength } = require('vuelidate/lib/validators')
	import { createNamespacedHelpers, mapActions } from 'vuex'
	const { mapGetters } = createNamespacedHelpers('alert')

	export default {
		data () {
			return {
				newPassword: "",
				repeatPassword: "",
				submitStatus: null,
				passwordShow: false,
	            passwordShowIcon: mdiEye,
	            passwordEyeCancel: mdiEyeCheck,
			}
		},
    	mixins: [validationMixin],
    	validations: {
    	  newPassword: {
	        required,
	        min: minLength(7)
	      }, 
	      repeatPassword : {
	        required, 
	        same: sameAs('newPassword'),
	        min: minLength(7)
	      }
    	},
		methods: {
			...mapActions('auth', ['replaceForgotPassword']),
			changePassword() {
				let data = {
					newPassword: this.newPassword,
					repeatPassword: this.repeatPassword
				}

				this.$v.$touch();
		        if(this.$v.$invalid) {
		          this.submitStatus = "ERROR"
		        } else {
		            this.submitStatus = "PENDING";
					this.replaceForgotPassword({ token : this.$route.params.token, data });
					// console.log("data", data)

		            this.submitStatus = 'OKAY';
		            this.passwordShow = false;
		            this.newPassword = this.repeatPassword = "";
		            this.$v.$reset()
		          
		        }
			},

		},
		computed: {
			...mapGetters(['Messages']),
		      newPasswordErrors () {
		      	const errors = [];
		        if(!this.$v.newPassword.$dirty) {
		          return errors
		        }
		        if(!this.$v.newPassword.required) {
		          errors.push('A password is required...')
		        }

		        if(!this.$v.newPassword.min) {
		          errors.push("Please enter a minimum of 7 characters")
		        }
		        return errors;
		      },
		      repeatPasswordErrors () {
		        const errors = [];
		        if(!this.$v.repeatPassword.$dirty) {
		          return errors
		        } 

		        if(!this.$v.repeatPassword.required) {
		          errors.push('Please enter the repeat password.')
		        }

		        if(!this.$v.repeatPassword.same) {
		          errors.push('The passwords do not match')
		        }

		        return errors;
		      },
		},
		watch: {
	      $route : {
	        immediate: true,
	         handler(to, from) {
	          console.log("token", this.$route.params.token)
	        }
	      }
    	}
	}
</script>

<style lang="scss">
	.center {
		justify-content: center;
	}
</style>