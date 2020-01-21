<template>
    <v-card
        min-width="290"
        max-width="60%"
        flat
    >
        <v-img
            src="@/assets/Kander.png"
            aspect-ratio="16/9"
            height="100"
            gradient="to top, rgba(0, 0, 32, .75), rgba(0, 0, 0, 0.32)"
        >
            <v-card-title class="font-weight-bold white--text text-center">
                Add your new Unit
            </v-card-title> 
        </v-img>
    
        <v-card-text>
            <form class="m-4" @submit.prevent="saveUnit">
                <h3 class="green--text">Unit details</h3>
                    
                <v-text-field
                    name="unitName"
                    outlined
                    label="Enter Units name"
                    required
                    clearable
                    :rules="rules"
                    counter="15"
                    v-model="$v.name.$model"
                    :error-messages="nameErrors"
                    color="green darken-3"
                    type="text"
                    max="15"
                ></v-text-field>
                <v-textarea
                    outlined
                    name="description"
                    cleareable
                    :clear-icon="clear"
                    rows="4"
                    row-height="20"
                    v-model="$v.description.$model"
                    :error-messages="descriptionErrors"
                    color="green darken-3"
                    label="Description"
                    type="text"
                >
                </v-textarea>
                <v-text-field
                    name="streetname"
                    label="Streetname"
                    outlined
                    v-model="$v.streetname.$model"
                    :error-messages="streetNameErrors"
                    color="green darken-3"
                    type="text"
                ></v-text-field>
                <v-text-field
                    name="category"
                    label="Category"
                    outlined
                    v-model="$v.category.$model"
                    :error-messages="categoryErrors"
                    color="green darken-3"
                    type="text"
                ></v-text-field>
                <h3 class="green--text">Unit space</h3>
                <div class="flex-sm-column flex-lg-row flex-md-row" justify="space-between" align="center">
                        <v-select
                            v-model="$v.rooms.$model"
                            :items="roomNumber"
                            :error-messages="roomErrors"
                            label="Select number of rooms"
                            color="green darken-3"
                            outlined
                        ></v-select>
                        <v-select
                            v-model="$v.bathrooms.$model"
                            :error-messages="bathroomError"
                            :items="bathroomNumber"
                            label="Select number of bathrooms"
                            outlined
                            color="green darken-3"
                        ></v-select>
                        <v-text-field
                            name="area"
                            required
                            type="number"

                            label="Select the square feet in metre squared"
                            v-model.number="$v.area.$model"
                            :error-messages="areaErrors"
                            outlined
                            color="green darken-3"
                        ></v-text-field>
                    
                </div>
                <h3 class="green--text">Unit pricing</h3>
                
                <v-text-field
                    name="priceAnnual"
                    type="number"
                    required="true"
                    outlined
                    v-model.number.trim="$v.priceAnnual.$model"
                    :error-messages="priceAnnualErrors"
                    color="green darken-3"
                    label="Annual Charge"
                ></v-text-field>
                <v-text-field
                    name="priceMonth"
                    type="number"
                    outlined
                    v-model.number.trim="$v.priceMonth.$model"
                    :error-messages="priceMonthErrors"
                    label="Enter the monthly rent"
                    color="green darken-3"
                ></v-text-field>

                <v-combobox
                    v-model="terms"
                    chips
                    hide-selected
                    label="Enter the terms for your unit"
                    multiple
                    color="green darken-3"
                    :items="termsAll"
                >
                    <template
                        v-slot:selection="data"
                    >
                        <v-chip  
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click.stop="data.parent.selectedIndex = data.index"
                        @click.close="data.parent.selectedItem(data.item)"
                        >
                            <v-avatar class="green white--text" left>
                                {{ data.item.slice(0, 1).toUpperCase()}}
                            </v-avatar>
                            {{ data.item }}
                        </v-chip>
                    </template>
                </v-combobox>
                <v-btn 
                    depressed 
                    color="primary" 
                    type="submit" 
                    :disabled="submitStatus == 'OKAY' &&  submitStatus !== 'ERROR'" 
                    :loading="submitStatus === 'PENDING'">Add Unit</v-btn>
            </form>
        </v-card-text>
    </v-card>    
</template>

<script>
import { validationMixin } from 'vuelidate';
import { mdiCancel } from '@mdi/js'
const { minLength, maxLength, required, between, numeric } = require('vuelidate/lib/validators')

import { mapGetters, mapState, mapActions } from 'vuex';

export default {
    name: 'new-unit',
    mixins: [validationMixin],
    data() {
        return {
            clear: mdiCancel,
            rules: [v => v.length <= 15 || 'Maximum 15 characters please.'],

            roomNumber: [1, 2, 3, 4, 6, 8, 10],
            bathroomNumber: [1, 2, 3, 4, 5],
            termsAll: ['morgage', 'rent', 'purchase'],

            name: '',
            description: '',
            streetname: '',
            rooms: 1,
            bathrooms: 1,
            area: '',
            terms: ['rent'],
            category: "",
            priceAnnual: '',
            priceMonth: '',
            submitStatus: null
        }
    },
    validations : {
        name:  {
            required,
            min : minLength(2),
            max : maxLength(20)
        },
        description: {
            required,
            min: minLength(10),
            max: maxLength(200)
        },
        streetname : {
            required
        },
        category: {
            required
        },
        rooms: {
            required,
            withinRange: between(1, 10),
            numeric
        },
        bathrooms : {
            required,
            withinRange: between(1, 10),
            numeric
        },
        area : {
            required,
            numeric,
            withinRange: between(0, 100000)
        },
        priceAnnual : {
            required,
            numeric, 
            withinRange: between(0, 1000000)
        },
        priceMonth : {
            required,
            numeric, 
            withinRange: between(0, 100000)
        }
    },
    methods : {
        ...mapActions('unit', ['newUnitAdd']),
       saveUnit () {
            let body =  JSON.stringify({
                            name: this.name,
                            description: this.description,
                            category: this.category,
                            street: this.street,
                            area: this.area,
                            bathrooms: this.bathrooms,
                            term: this.terms,
                            priceAnnual: this.priceAnnual,
                            priceMonth: this.priceMonth,
                            noOfRooms: this.rooms
                        });
            let data = {
                url: this.companyByOwnerId(this.loggedInUser.id).slug,
                info: body
            }

            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
                this.submitStatus = "OKAY"
                this.name = this.description =  this.category = this.streetname = this.area = this.priceAnnual = this.priceMonth = "";
                this.rooms = this.bathrooms = 1;
                this.term = ['rent'];
                this.submitStatus = null;
                console.log("body", data)
                this.newUnitAdd(data);
                this.$v.$reset()
            }
        }
    },
    computed : {
        ...mapGetters('company', ['companyByOwnerId']),
        ...mapGetters('auth', ['loggedInUser']),
        nameErrors () {
            const errors = [];
            if(!this.$v.name.$dirty) return errors;
            if(!this.$v.name.required) errors.push("Please provide a name");
            if(!this.$v.name.min) {
                errors.push('Name requires a minimum of 2 charactrers')
            } else if(!this.$v.name.max) {
                errors.push('Name requires a maximum of 20 characters')
            }
            
            return errors;
        },
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
        streetNameErrors () {
            const errors = [];
            if(!this.$v.streetname.$dirty) return errors;
            if(!this.$v.streetname.required) errors.push("Please provide room number");
            
            return errors
        },
        categoryErrors () {
            let errors = []
            if(!this.$v.category.$dirty) return errors;
            if(!this.$v.category.required) {errors.push("Please enter the unit category"); }
            return errors
        },
        roomErrors () {
            const errors = [];
            if(!this.$v.rooms.$dirty) return errors;
            if(!this.$v.rooms.required) errors.push("Please provide room number");
            if(!this.$v.rooms.withinRange) {
                errors.push("Please provide a valid room number above 0")
            }
            if(!this.$v.rooms.numeric) {
                errors.push("You are required to enter only numeric figures.")
            }
            return errors;
        },
        bathroomError () {
            const errors = [];
            if(!this.$v.bathrooms.$dirty) return errors;
            if(!this.$v.bathrooms.required) errors.push("Please provide an bathroom number");
            if(!this.$v.bathrooms.withinRange) {
                errors.push("Please provide valid number of bathrooms")
            }
            if(!this.$v.bathrooms.numeric) {
                errors.push("You are required to enter only numeric figures.")
            }
            return errors;
        },
        areaErrors () {
            const errors  = [];
            if(!this.$v.area.$dirty) return errors;
            if(!this.$v.area.required) errors.push("Please provide an area coverage");
            if(!this.$v.area.withinRange) {
                errors.push("Please provide a valid area above 0 and 1000000  in square metres")
            }
            if(!this.$v.area.numeric) {
                errors.push("You are required to enter only numeric figures.")
            }
            return errors;
        },
        priceAnnualErrors () {
            const errors = [];
            if(!this.$v.priceAnnual.$dirty) return errors;
            if(!this.$v.priceAnnual.required) errors.push("The price is required")
            if(!this.$v.priceAnnual.numeric) {
                errors.push('Please provide a valid price')
            }

            if(!this.$v.priceAnnual.withinRange) {
                errors.push('Please enter a valid price within the range 0 and 1000000')
            }
            return errors;
        },
        priceMonthErrors () {
            const errors = [];
            if(!this.$v.priceMonth.$dirty) return errors;
            if(!this.$v.priceMonth.numeric) {
                errors.push('Please provide a valid price')
            }

            if(!this.$v.priceMonth.withinRange) {
                errors.push('Please enter a valid month price within the range 0 and 1000000')
            }
            return errors;
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>