<template>
	<div>
		<NavBar loggedIn="loggedIn" :user="loggedInUser.username" v-if="loggedIn" #loggedInRoutes>
			<v-btn text>
            	<router-link to="/dashboard" class="link">dashboard</router-link>
          	</v-btn>
			<v-btn text>
	          <router-link to="/units" class="link">units</router-link>
	        </v-btn>
	       
	         <v-btn text>
	          <router-link to="/blogs" class="link">blogs</router-link>
	         </v-btn>
	         <v-btn text @click="logOutUser">
	           Log Out
	         </v-btn>
	         <v-btn text v-if="loggedInUserType == 'owner'">
	           <router-link to="/logout" class="link">Add Unit</router-link>
	         </v-btn>
        </NavBar>
        <v-content app dark>
        	<v-container>
        		<div v-if="userProfile == 'undefined'">
        			<new-profile></new-profile>
        			<v-card>
        				<v-toolbar color="blue">
        					<v-toolbar-title>Change Password</v-toolbar-title>
        				</v-toolbar>
        				<div 
                        v-if="messages.length > 0" 
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
        				<v-card-text>
        					<v-form @submit.prevent="replacePassword">
        						<v-text-field
				                    name="password"
				                    label="Old password"
				                    outlined
				                    v-model.trim="$v.oldPassword.$model"
				                    id="oldPassword"
				                    :error-messages="oldPasswordErrors"
				                    :type="passwordShow ? 'text' : 'password'"
				                    :append-icon="passwordShow ? passwordEyeCancel: passwordShowIcon"
				                    @click:append="passwordShow = !passwordShow"
				                    autocomplete="on"
				                    required
				                    color="success"
				                  ></v-text-field>
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
				                    :type="repeatPassword ? 'text' : 'password'"
				                    :append-icon="repeatPassword ? passwordEyeCancel: passwordShowIcon"
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
				                  :loading="submitStatus === 'PENDING' && status.registering"
				                  >Change password</v-btn>
        					</v-form>
        				</v-card-text>
        			</v-card>
        		</div>
        		<div v-else>
        			<user-profile :userProfile="userProfile"></user-profile>
        		</div>
        	</v-container>
        </v-content>
        <Footer/>
	</div>
</template>

<script>
	import userProfile from '@/components/userprofile.vue';
	import NavBar from '@/components/NavBar.vue';
	import Footer from '@/components/Footer.vue';
	import NewProfile from '@/components/newprofile.vue'

	import { validationMixin } from 'vuelidate'
	import { mdiEye, mdiEyeCheck } from '@mdi/js'

	import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
	const { mapGetters } = createNamespacedHelpers('auth');

	export default {
		name: 'Profile',
		mixins: [validationMixin],
		components: {
			NavBar,
			'user-profile': userProfile,
			'new-profile': NewProfile,
			Footer
		},
		data() {
			return {
				userProfile: {},
				submitStatus: null,
				oldPassword: "",
				newPassword: "",
				repeatPassword: "",
				passwordShow: false,
	            passwordShowIcon: mdiEye,
	            passwordEyeCancel: mdiEyeCheck
			}
		},
		validations: {
			oldPassword: {
				required,
				min: minLength(7)
			},
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
			...mapActions('auth', ['changePassword']),
			replacePassword() {
				let data = {
					oldPassword : this.oldPassword,
					newPassword: this.newPassword,
					repeatPassword: this.repeatPassword
				}

				this.$v.$touch();
		        if(this.$v.$invalid) {
		          this.submitStatus = "ERROR"
		        } else {
		            this.submitStatus = "PENDING";
		            this.changePassword(data);
		            this.passwordShow = false;
		            this.oldPassword = this.newPassword = this.repeatPassword = "";
		            this.$v.$reset()
		        }
			}
		},
		created() {
			this.userProfile = this.$cookies.get('userProfile')
		},
		computed: {
			...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
			...mapState({
				loggedIn: state => state.auth.status,
				settingProfile: state => state.profile.settingUserProfile,
				messages: state => state.alert.Messages
			}),
			oldPasswordErrors() {
		        const errors = [];
		        if(!this.$v.oldPassword.$dirty) {
		          return errors
		        }
		        if(!this.$v.oldPassword.required) {
		          errors.push('A password is required...')
		        }

		        if(!this.$v.oldPassword.min) {
		          errors.push("Please enter a minimum of 7 characters")
		        }
		        return errors;
		      },
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
		methods: {
      		...mapActions('auth', ['logOutUser'])
		}
	}
</script>