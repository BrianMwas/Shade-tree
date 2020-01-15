<template>
	<div>
		<v-card>
			<v-toolbar color="amber darken-4">
				<v-toolbar-title class="white--text">Add Profile</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-form @submit.prevent="addProfile">
					<v-file-input
                    show-size
                    label="Add your profile pic"
                    filled
                    :prepend-icon="camera"
                    accept="image/png, image/jpeg, image/jpg"
                  ></v-file-input>
                  <v-text-field
                    name="firstName"
                    label="First name"
                    filled
                    v-model.trim="$v.firstName.$model"
                    id="firstName"
                    :error-messages="fnameErrors"
                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                    required
                    type="text"
                    autocomplete="on"
                  ></v-text-field>
                  <v-text-field
                    name="secondName"
                    label="Second Name"
                    filled
                    v-model.trim="$v.secondName.$model"
                    id="secondName"
                    :error-messages="snameErrors"
                    @input="$v.secondName.$touch()"
                    @blur="$v.secondName.$touch()"
                    required
                    type="text"
                    autocomplete="on"
                  ></v-text-field>
                  <v-text-field
                    name="telephone"
                    label="Telephone"
                    filled
                    v-model.trim="$v.telephone.$model"
                    @input="$v.telephone.$touch()"
                    id="telephone"
                    :error-messages="telephoneErrors"
                    
                    @blur="$v.telephone.$touch()"
                    required
                    type="text"
                    autocomplete="on"
                  ></v-text-field>
                  <v-textarea
                      filled
                      name="description"
                      cleareable
                      :clear-icon="clear"
                      rows="4"
                      row-height="20"
                      v-model.trim="$v.description.$model"
                      @input="$v.description.$touch()"
                      :error-messages="descriptionErrors"
                      color="green darken-3"
                      label="Description"
                      type="text"
                  >
                  </v-textarea>
                
                  <v-btn 
                    block
                    depressed 
                    color="primary" 
                    type="submit" 
                    :disabled="submitStatus == 'OKAY' && submitStatus !== 'ERROR' && addingProfileFail" 
                    :loading="addingProfile">Add profile</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</div>	
</template>

<script>
	import { validationMixin } from 'vuelidate'
	const { minLength, maxLength, numeric, required } = require('vuelidate/lib/validators')
	import { mapActions, mapState } from 'vuex';
	import { mdiCamera, mdiClear } from '@mdi/js'

	export default {
		name: 'NewProfile',
		mixins: [validationMixin],
		data () {
			return {
				firstName: "",
				secondName: "",
				telephoneNumber: 0,
				description: "",
				image: null,
				submitStatus: null,
				camera: mdiCamera,
				clear: mdiClear
			}
		},
		validations: {
			firstName: {
	        required,
	        min : minLength(2),
	        max : maxLength(20)
	      },
	      secondName: {
	        required,
	        min : minLength(2),
	        max : maxLength(20)
	      },
	      telephone: {
	        numeric,
	        min: minLength(10),
	        max: maxLength(13)
	      },
	      description: {
	        required,
	        min: minLength(10),
	        max: maxLength(200)
	      }
		},
		computed: {
			...mapState({
				addingProfile: state => state.profile.settingUserProfile,
				addingProfileFail: state => state.profile.settingUserProfileFail
			}),
			descriptionErrors () {
		        const errors = [];
		        if(!this.$v.description.$dirty) return errors;
		        if(!this.$v.description.required) errors.push("Please provide a description");
		        if(!this.$v.description.min) {
		            errors.push('Please provide a minimum of 10 characters')
		        } 
		        if (!this.$v.description.max) {
		            errors.push('Please provide a maximum of 200 characters')
		        }

		        return errors;
		    },
		    fnameErrors () {
		          const errors = [];
		          if(!this.$v.firstName.$dirty) return errors;
		          if(!this.$v.firstName.required) errors.push("Please provide a name");
		          if(!this.$v.firstName.min) {
		              errors.push('Name requires a minimum of 2 charactrers')
		          } else if(!this.$v.firstName.max) {
		              errors.push('Name requires a maximum of 20 characters')
		          }
		          
		          return errors;
		      },
		      snameErrors () {
		          const errors = [];
		          if(!this.$v.secondName.$dirty) return errors;
		          if(!this.$v.secondName.required) errors.push("Please provide a name");
		          if(!this.$v.secondName.min) {
		              errors.push('Name requires a minimum of 2 charactrers')
		          } else if(!this.$v.secondName.max) {
		              errors.push('Name requires a maximum of 20 characters')
		          }
		          
		          return errors;
		      },
		      telephoneErrors () {
		        const errors = [];
		        if(!this.$v.telephone.$dirty) return errors;
		        if(!this.$v.telephone.numeric) {
		          errors.push("Number must contain numbers only")
		        }
		        if(!this.$v.telephone.min) {
		          errors.push("Telephone requires a minmum of 10 numbers")
		        } 
		        if(!this.$v.telephone.max) {
		          errors.push("Telephone requires a maximum of 13 numbers")
		        }

		        return errors;
		      }
		},
		methods: {
			...mapActions('profile', ['setUserProfile']),
				addUserProfile() {
				let data = {
					firstName: this.firstName,
					secondName: this.secondName,
					image: this.image,
					description: this.description,
					telephoneNumber: this.telephoneNumber
				}
				this.$v.$touch();
		        if(this.$v.$invalid) {
		          this.submitStatus = "ERROR"
		        } else {
		            this.submitStatus = "PENDING";
		            this.setUserProfile(data);

		            this.firstName = "";
		            this.secondName = "";
		            this.description = this.image = "";
		            this.telephoneNumber = ""
		            this.$v.$reset()
		        }
			}
		}
	}
</script>

<style lang="scss"></style>