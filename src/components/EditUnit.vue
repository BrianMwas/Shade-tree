<template>
    <div>
        <v-expansion-panels  class="w-50">
            <v-expansion-panel
            >   
                <v-expansion-panel-header>
                    {{ unit.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card flat>
                        <v-row v-if="unit.images">
                            <v-col
                                v-for="image in unit.images"
                                :key="image._id"
                                cols="12"
                                md="4"
                                lg="4"
                            >
                                    <v-img
                                        :src="image.url"
                                        aspect-ratio="1"
                                        contain
                                    ></v-img>
                            </v-col>
                        </v-row>
                        <v-card-text>
                            <v-form @submit.prevent="unitUpdate(unit._id)">
                                <v-text-field
                                    name="unitName"
                                    outlined
                                    label="Enter Units name"
                                    required
                                    clearable
                                    :rules="rules"
                                    counter="50"
                                    v-model="$v.name.$model"
                                    :error-messages="nameErrors"
                                    color="green darken-3"
                                    type="text"
                                    max="50"
                                ></v-text-field>
                                <v-textarea
                                    outlined
                                    name="description"
                                    cleareable
                                    :clear-icon="clear"
                                    rows="4"
                                    hint="Say more about your unit"
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
                                <v-select
                                    v-model="$v.category.$model"
                                    :items="categories"
                                    :error-messages="categoryErrors"
                                    label="Select unit category"
                                    color="green darken-3"
                                    outlined
                                    hint="Units with rooms above 3 will be an apartment"
                                    name="category"
                                ></v-select>
                                <h3 class="green--text">Unit space</h3>
                                <div class="flex-sm-column flex-lg-row flex-md-column" justify="space-between" align="center">
                                    <v-text-field
                                            name="noOfUnits"
                                            required
                                            type="number"

                                            label="Select number of units"
                                            v-model.number="unitNumber"
                                            
                                            outlined
                                            hint="Select if units are the same e.g Stalls"
                                            color="green darken-3"
                                        ></v-text-field>
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

                                <h3 class="green--text">Extra details</h3>
                                <v-text-field
                                    name="Parking"
                                    type="text"
                                    outlined
                                    v-model.trim="parking"
                                    color="green darken-3"
                                    label="Parking"
                                ></v-text-field>
                                <v-select
                                    v-model="completionYear"
                                    :items="Years"
                                    label="Select year completed"
                                    outlined
                                    color="green darken-3"
                                    name="completionYear"
                                ></v-select>
                                <v-select
                                    v-model="securityLevel"
                                    :items="security"
                                    
                                    label="Security level"
                                    hint="How secure is it from the surrounding and within the compund."
                                    color="green darken-3"
                                    outlined

                                    name="security"
                                ></v-select>

                                <h3 class="green--text">Unit pricing</h3>
                                
                                <v-text-field
                                    name="priceAnnual"
                                    type="number"
                                    required="true"
                                    outlined
                                    v-model.number.trim="$v.priceAnnual.$model"
                                    :error-messages="priceAnnualErrors"
                                    color="green darken-3"
                                    label="Price"
                                    hint="price for the unit if on sale"
                                ></v-text-field>
                                <v-text-field
                                    name="priceMonth"
                                    type="number"
                                    outlined
                                    v-model.number.trim="$v.priceMonth.$model"
                                    :error-messages="priceMonthErrors"
                                    label="Enter the monthly rent"
                                    color="green darken-3"
                                    hint="price if on rent"
                                ></v-text-field>


                            </v-form>
                        </v-card-text>
                    </v-card>
                    <v-card flat>
                        <v-card-text class="p-3">
                            <picture-input 
                                ref="pictureInput" 
                                @change="onChange" 
                                @remove="onRemoved"
                                width="300" 
                                height="300" 
                                margin="16" 
                                buttonClass="button button-primary"
                                accept="image/jpeg,image/png" 
                                size="10" 
                                radius="50"
                                :removable="true"
                                :customStrings="{
                                upload: '<h1>Upload!</h1>',
                                drag: 'Drag the unit image here',
                                tap: 'Tap here to select a photo.'
                                }">
                            </picture-input>
                        
                            <button @click="addImage(unit._id)" class="button button-block button-primary my-5" :disabled="!image">
                            Add Image
                            </button>
                        
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>

import PictureInput from 'vue-picture-input';

import { validationMixin } from 'vuelidate';
import { mdiCancel } from '@mdi/js'
const { minLength, maxLength, required, between, numeric } = require('vuelidate/lib/validators')
import  { mapActions } from "vuex"


export default {
    name: "edit-unit",
    props: ["updateUnit"],
     mixins: [validationMixin],
     components: {
        PictureInput
     },
    data () {
        return  {
             image: null,
            clear: mdiCancel,
            rules: [v => v.length <= 50 || 'Maximum 15 characters please.'],

            roomNumber: [1, 2, 3, 4, 6, 8, 10],
            bathroomNumber: [1, 2, 3, 4, 5],
            termsAll: ['morgage', 'rent', 'purchase'],
            categories: ["Apartment", "Mansionette", "Bedsitter", "Single room", "Double room", "Stall", "Workspace"],
            security: ["Bad", "Fair", "Good", "Very Good"],
            Years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
            
            
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
            completionYear: "",
            securityLevel: "",
            parking: "",
            unitNumber: 1,
            submitStatus: null
        }
    },
    validations : {
        name:  {
            required,
            min : minLength(2),
            max : maxLength(50)
        },
        description: {
            required,
            min: minLength(70),
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
            withinRange: between(0, 100000000)
        },
        priceMonth : {
            required,
            numeric, 
            withinRange: between(0, 100000)
        }
    },
    methods: {
        ...mapActions("unit", ["updateUnit", "addUnitImages"]),
        onChange () {
          console.log('New picture selected!')
          if (this.$refs.pictureInput.image) {
            console.log('Picture loaded.')
          } else {
            console.log('FileReader API not supported: use the <form>, Luke!')
          }
        },
        onRemoved() {
          this.image = '';
        },
        addImage(unitId) {
            if(this.image) {
                let data = {
                    image : this.image,
                    companySlug: this.company.slug,
                    unitId,
                }
                this.addUnitImage(data)
            }
        },
        unitUpdate (unitId) {
            let data = {
                name: this.name,
                description: this.descrtiption,
                streetname: this.streetname,
                rooms: this.rooms,
                bathrooms: this.bathrooms,
                area: this.area,
                terms: this.terms,
                category: this.category,
                price: this.priceAnnual,
                priceMonth: this.priceMonth,
                securityLevel: this.securityLevel,
                parking: this.parking,
                unitNumber: this.unitNumber,
                completionYear: this.completionYear
            }

            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
                this.submitStatus = "OKAY"
                this.name = this.description = this.parking =  this.category = this.streetname = this.area = this.priceAnnual = this.priceMonth = "";
                this.unitNumber = 1;
                this.bathrooms = 1;
                this.securityLevel = "";
                this.term = ["rent"]

                this.rooms = this.bathrooms = 1;
                this.term = ['rent'];
                this.submitStatus = null;
                this.updateUnit({unitId: unitId,  data});
                this.$v.$reset()
            }
        },
        populateFields() {
            if(this.updateUnit !== null) { 
                    this.name = this.updateUnit.name;
                    this.description= this.updateUnit.description;
                    this.streetname= this.updateUnit.streetname;
                    this.rooms = this.updateUnit.rooms;
                    this.bathrooms = this.updateUnit.bathrooms;
                    this.area= this.updateUnit.area
                    this.terms =this.updateUnit.terms
                    this.category = this.updateUnit.category
                    this.priceAnnual = this.updateUnit.price
                    this.priceMonth = this.updateUnit.priceMonth
                    this.completionYear = this.updateUnit.completionYear
                    this.securityLevel = this.updateUnit.securityLevel
                    this.parking = this.updateUnit.parking
                    this.unitNumber = this.updateUnit.unitNumber
             }
            
        },
        nameErrors () {
            const errors = [];
            if(!this.$v.name.$dirty) return errors;
            if(!this.$v.name.required) errors.push("Please provide a name");
            if(!this.$v.name.min) {
                errors.push('Name requires a minimum of 3 characters')
            } else if(!this.$v.name.max) {
                errors.push('Name requires a maximum of 50 characters')
            }
            
            return errors;
        },
        descriptionErrors () {
            const errors = [];
            if(!this.$v.description.$dirty) return errors;
            if(!this.$v.description.required) errors.push("Please provide a description");
            if(!this.$v.description.min) {
                errors.push('Please provide a minimum of 70 characters.')
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
    },
    mounted () {
        this.populateFields()
    }
}
</script>