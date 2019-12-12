<template>
    <v-card
        min-width="290"
        max-width="60%"
    >
    <v-img
        src="@/assets/Thur.png"
        lazy-src="@/assets/green pot.jpg"
        height="100"
        gradient="to top, rgba(0, 0, 0, .77), rgba(0, 0, 0, .45)"
    >
        <v-card-title class="font-weight-bold white--text text-center">
            Add new product
        </v-card-title>
    </v-img>

    <v-card-text>
        <form class="m-4" @submit.prevent="saveProduct">
            <v-text-field
                name="productName"
                filled
                label="Enter product title"
                clearable
                v-model.trim="$v.productName.$model"
                :error-messages="productNameErrors"
                @input="$v.productName.$touch()"
                color="green darken-3"
                type="text"
                required
            ></v-text-field>
            <v-textarea
                filled
                name="productDescription"
                clearable
                rows="4"
                row-height="4"
                v-model.trim="$v.productDescription.$model"
                @input="$v.productDescription.$touch()"
                color="green darken-3"
                label="Product description"
                type="text"
                required
                counter
                :error-messages="productDescriptionErrors"
            ></v-textarea>
            <v-text-field
                name="price"
                label="Price"
                v-model.trim.number="$v.productPrice.$model"
                color="green darken-3"
                filled
                :error-messages="productPriceErrors"
                @input="$v.productPrice.$touch()"
                required
            ></v-text-field>

            <v-text-field
                name="contactDetails"
                label="Contact details"
                v-model.trim="contactDetails"
                color="green darken-3"
                filled
                type="required"
            ></v-text-field>

            <v-text-field
                name="Your product site"
                color="green darken-3"
                v-model.trim="$v.productSite.$model"
                type="text"
                label="Product site"
                :error-messages="productSiteErrors"
                filled
                persistent-hint
                hint="https://example.com"
                class="mb-5"
            ></v-text-field>

            <v-combobox
                v-model="modeOfPayment"
                chips
                hide-selected
                label="Enter the terms for your unit"
                multiple
                color="green darken-3"
                :items="modesOfPayment"
                filled
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
                    <v-avatar class="primary white--text" left>
                        {{ data.item.slice(0, 1).toUpperCase()}}
                    </v-avatar>
                    {{ data.item }}
                </v-chip>
            </template>
        </v-combobox>
        <v-btn 
        depressed 
        color="success" 
        type="submit" 
        :disabled="submitStatus == 'OKAY' &&  submitStatus !== 'ERROR'" 
        :loading="submitStatus === 'PENDING'">Add product</v-btn>
        </form>
    </v-card-text>
    </v-card>
</template>

<script>
import  { validationMixin } from 'vuelidate';
const  { minLength, required, maxLength, between, numeric, url  } = require('vuelidate/lib/validators')

export default {
    mixins: [validationMixin],
    data () {
        return  {
            productName : "",
            productDescription: "",
            productPrice: "",
            contactDetails: "",
            productSite: "",
            modeOfPayment: ['Card'],
            modesOfPayment: ['M-pesa', 'Card', 'Cash', 'Flutterwave'],

            submitStatus: null
        }
    },
    validations : {
        productName: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(20), 
       
        },
        productDescription: {
            required,
            max: maxLength(200)
        },
        productPrice : {
            required,
            withinRange : between(0, 50000), 
            numeric
        },
        productSite: {
            required,
            url
        }
    },
    methods: {
       async saveProduct () {
            let data = {
                productName : this.productName,
                productDescription: this.productDescription,
                productPrice: this.productPrice,
                contactDetails: this.contactDetails,
                productSite: this.productSite,
                modeOfPayment: this.modeOfPayment
            }
            

            this.$v.$touch();
            if(this.$v.$invalid) {
                this.submitStatus = "ERROR"
            } else {
                this.submitStatus = "PENDING";
                setTimeout(() => {
                    this.submitStatus = "OKAY"
                    this.productName = this.productDescription = this.productPrice = this.contactDetails = this.productSite = "";
                    this.modeOfPayment = ['Cash']
                    this.submitStatus = null
                    console.table(data);
                    this.$v.$reset();
                }, 500)
            }
        }
    },
    computed: {
        productNameErrors () {
            const errors = [];
            if(!this.$v.productName.$dirty) return errors;
            if(!this.$v.productName.required) {
                errors.push('A product name is required')
            }

            if(!this.$v.productName.minLength) {
                errors.push('A product name requires a minimum of 4 characters')
            } else if(!this.$v.productName.maxLength) {
                errors.push('Product name requires a maximum of 20 characters')
            }

            return errors;
        },
        productDescriptionErrors () {
            const errors = [];

            if(!this.$v.productDescription.$dirty) return errors;
            if(!this.$v.productDescription.required) {
                errors.push("Product description is required");
            } 
            if(!this.$v.productDescription.max) {
                errors.push("Product description requires a minimum of 200 characters.")
            }

            return errors;
        },
        productPriceErrors () {
            const errors = [];
            if(!this.$v.productPrice.$dirty) return errors;
            if(!this.$v.productPrice.required) {
                errors.push('Product price is required')
            }
            if(!this.$v.productPrice.withinRange) {
                errors.push('The price needs to be between 0 and 50000')
            }

            if(!this.$v.productPrice.numeric) {
                errors.push('Price should only be a number.')
            }

            return errors;
        },
        productSiteErrors () {
            const errors = [];
            if(!this.$v.productSite.$dirty) return errors;
            if(!this.$v.productSite.required) {
                errors.push("Product price is required")
            } 
            if(!this.$v.productSite.url) {
                errors.push("Product price is not a valid url")
            }

            return errors;
        }
    }
}
</script>


<style lang="scss" scoped>

</style>