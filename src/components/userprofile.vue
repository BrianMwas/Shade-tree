<template>
	<div>
		<v-card max-width="400"  class="mb-2">
        <v-toolbar color="cyan">
            <v-toolbar-title class="white--text">
              Profile
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon ripple @click="changeProfile">
              <v-icon color="white">{{ edit }}</v-icon>
            </v-btn>
        </v-toolbar>
            <v-card-text transition="slide-y-transition">
              <div  v-if="!editProfile">
                  <v-img class="mb-5"  :aspect-ratio="1" max-height="250" lazy-src="@/assets/userProf.png"  :src="userProfile.profileImage">
                     <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                  </v-img>

                  <h2 class="black--text">{{ userProfile.firstName + " " + userProfile.secondName }}</h2>
                  <h5 class="body-1"><span class="font-weight-bold">Description:</span> {{ userProfile.description }}</h5>
                  <h5 class="body-1"><span class="font-weight-bold">Telephone:</span> {{ userProfile.nationalFormat }}</h5>
              </div>
              <div v-else>
                <v-form @submit.prevent="editUserProfile">
                  <v-file-input
                    show-size
                    label="Add your profile pic"
                    outlined
                    :prepend-icon="camera"
                    accept="image/png, image/jpeg, image/jpg"
                  ></v-file-input>
                  <v-text-field
                    name="firstName"
                    label="First name"
                    outlined
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
                    outlined
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
                    outlined
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
                      outlined
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
                    :disabled="submitStatus == 'OKAY' &&  submitStatus !== 'ERROR'" 
                    :loading="submitStatus === 'PENDING'">Change profile</v-btn>
                </v-form>
              </div>
            </v-card-text>

    </v-card>
	</div>
</template>

<script>
const { minLength, maxLength, required, numeric } = require('vuelidate/lib/validators')
import { validationMixin } from 'vuelidate';
import { mdiPencil, mdiCamera, mdiCancel } from '@mdi/js';

export default  {
	name: 'user-profile',
  mixins: [validationMixin],
  props: {
    userProfile: Object,
  },
	data () {
		return {
      editProfile: false,
      firstName: "",
      secondName: "" ,
      telephone: "" ,
      description: "",
      profileImage: null,
      submitStatus: null,
      edit : mdiPencil,
      camera: mdiCamera,
      clear: mdiCancel
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
        changeProfile() {
          console.log(this.editProfile)
          if(this.editProfile) {
            this.editProfile = false
          } else {
              this.editProfile = true
            }
        }
  },
  mounted() {
    console.log("user profile in profile", this.userProfile)
    console.log("setting profile", this.settingProfile)
  },  
  created() {
    console.log("user profile in profile create", this.userProfile)
    this.firstName = this.userProfile.firstName;
    this.secondName = this.userProfile.secondName;
    this.description = this.userProfile.description;
    this.telephone = this.userProfile.telephoneNumber;
    this.profileImage = this.userProfile.profileImage;
  }
}
	
</script>