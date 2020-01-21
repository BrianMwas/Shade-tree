<template>
    <div class="h-100">
        <v-sheet 
            class="p-3" 
            color="white"
            v-if="loggedInUserType == 'owner'">
            <v-card
                max-width="700"
                min-width="300"
                max-height="auto"
                class="pt-5"
            >
                <v-img
                    src="@/assets/App Development.png"
                    :aspect-ratio="1"
                    contain
                ></v-img>
                <v-card-title>
                    Create your new company...
                </v-card-title>
                <v-card-subtitle>
                    Please fill in all details to continue to dashboard.
                </v-card-subtitle>
                <v-card-text v-if="userCompany == {} || userCompany == null">
                    <div v-if="Messages.length > 0">
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
                    <v-form @submit.prevent="createCompany">
                        <v-text-field
                            color="green darken-3"

                            outlined
                            flat
                            label="Company name"
                            type="text"
                            hint="Enter the name of your company"
                            v-model="$v.name.$model"
                            :error-messages="nameErrors"
                        ></v-text-field>
                        <v-textarea outlined
                                    name="Summary"
                                    required
                                    clearable
                                    label="Company summary"
                                    v-model="$v.summary.$model"
                                    :error-messages="summaryErrors"
                                    rows="5"
                                    row-height="30"
                                    type="text"
                                    color="green darken-3"
                                ></v-textarea>
                        <v-text-field
                            outlined
                            flat
                            label="Company email"
                            type="text"
                            color="green darken-3"

                            hint="The comapmy description example. mycompany@gmail.com"
                            v-model="$v.email.$model"
                        ></v-text-field>
                        <v-text-field
                            outlined
                            flat
                            label="Company website"
                            type="text"
                            hint="The company website eg. https://example.com"
                            color="green darken-3"

                            :error-messages="websiteErrors"
                            v-model="$v.website.$model"
                        ></v-text-field>
                        <v-text-field
                            outlined
                            flat
                            label="Company telephone"
                            type="text"
                            color="green darken-3"

                            v-model="$v.phoneNumber.$model"
                            :error-messages="phoneNumberErrors"
                            hint="Tel number please enter in this format +254705458766"
                        ></v-text-field>
                        <v-btn 
                        color="primary" 
                        :disabled="companySubmitStatus == 'ERROR'"
                        :loading="addingCompany == true"
                        type="submit"
                        >Add Company</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text v-else>
                    <h3 class="text-center black--text heading">Welcome back {{loggedInUser.username}}</h3>
                    <router-link class="button button-block" to="/dashboard">Continue</router-link>
                </v-card-text>
            </v-card>
            
        </v-sheet>
        <div v-if="loggedInUserType == 'user'">
            <v-card max-width="400">
                <v-img
                    src="@/assets/VR.png"
                    :aspect-ratio="1"
                    contain
                ></v-img>
                <v-card-text v-if="Messages.length > 0">
                    <p v-for="message in Messages" :key="message.mKey" class="subheading grey--text text--darken-1">
                        {{ message }}
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn to="/dashboard">Skip to login</v-btn>
                    <v-btn to="/units">Browse units</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate"
const { required, minLength, maxLength, url,  email, numeric } = require('vuelidate/lib/validators')


import { mapGetters, mapState, mapActions } from "vuex";


export default {
    mixins: [validationMixin],
    data() {
        return {
            name: "",
            summary: "",
            website: "",
            email: "",
            website: "",
            phoneNumber: "",
            companySubmitStatus: null
        }
    },
    validations: {
        name: {
            required,
            min: minLength(3),
            max: maxLength(20)
        },
        summary: {
            required,
            max: maxLength(400)
        },
        website: {
            url
        },
        email: {
            email,
            required
        },
        phoneNumber: {
            required,
            numeric,
            max: maxLength(10),
            min: minLength(10)
        }
    },
    methods: {
        ...mapActions('company', ['addCompany']),
        createCompany () {
            let data = {
                owner: this.loggedInUser._id,
                name: this.name,
                description: this.summary,
                email: this.email,
                website: this.website,
                phoneNumber: this.phoneNumber
            }
            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
                navigator.vibrate([150, 150, 150]);
            } else {
                this.companySubmitStatus = "PENDING";
                this.addCompany(data)
                this.name = this.summary = this.website = this.email = "";
                this.phoneNumber = "";
                this.$v.$reset()
            }
        }
    },
    computed : {
        ...mapGetters("auth", ["loggedInUser", "loggedInUserType"]),
        ...mapState({
            Messages: state => state.alert.Messages.map(m => m.Raw),
            addingCompany: state => state.company.addingCompany,
            companies: state => state.company.companies,
        }),
        userCompany() {
            return this.companies.find(c => c.owner == this.loggedInUser._id)
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
        nameErrors () {
            const errors = [];
            if(!this.$v.name.$dirty) return errors;
            if(!this.$v.name.required) {
                errors.push("Your company name is required")
            }
            if(!this.$v.name.min) {
                errors.push("Company name is requires a minimum of 3 characters")
            }
            if(!this.$v.name.max) {
                errors.push("Company name requires a minimum of 20 characters")
            }

            return errors;
        },
        websiteErrors () {
            const errors= [];
            if(!this.$v.website.$dirty) return errors;
            if(!this.$v.website.url) {
                errors.push("Enter a valid url")
            }

            return errors;
        },
        summaryErrors () {
            const errors = [];
            if(!this.$v.summary.$dirty) return errors;
            if(!this.$v.summary.required) {
                errors.push("Description is required")
            }
            if(!this.$v.summary.max) {
                errors.push("Company summary requires a maximum of 200 characters")
            }

            return errors;
        },
        phoneNumberErrors () {
            const errors = [];
            if(!this.$v.phoneNumber.$dirty) {
                return errors;
            }
            if(!this.$v.phoneNumber.numeric) {
                errors.push("Phone number can only be a number")
            }

            if(!this.$v.phoneNumber.max || !this.$v.phoneNumber.min) {
                errors.push("PLease enter a valid phone number")
            }

            return errors;
        }

    }
}
</script>

<style lang="scss" scoped>
.h-100 {
    
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin: 2em auto;
}
</style>