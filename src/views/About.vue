<template>
    <div>
       <NavBar v-if="loggedIn" #loggedInRoutes>
          <v-btn text>
           <router-link to="/map" class="link">map</router-link>
         </v-btn>
         <v-btn text>
           <router-link to="/logout" class="link">Log out</router-link>
         </v-btn>
         <v-btn text>
           <router-link to="/logout" class="link">Add Unit</router-link>
         </v-btn>
        </NavBar>
        <NavBar v-else #default>
            <v-btn text>
              <router-link to="/units" class="link">units</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/blogs" class="link">blogs</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/login" class="link">log in</router-link>
            </v-btn>
            <v-btn text>
              <router-link :to="{path:'/signup',query:{userType:'agent'}}" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>
        <v-content transition="fade-transition" app>
            <div class="container mt-5">
                <h2 class="heading grey--text text--darken-3">About Us</h2>
            
            
            <v-row class="my-5">
                <v-col cols="12" sm="12" lg="6" md="6">
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero tenetur magni quibusdam fugit nisi adipisci officia? Tempora reiciendis itaque eum et sint incidunt adipisci, delectus tenetur possimus? Dolore, error numquam.
                    </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error expedita quia hic numquam. Enim quisquam ratione repellat, quia a molestias eius, maiores cupiditate, distinctio officiis quam optio ut non quas?</p>
                </v-col>
                <v-col cols="12" sm="12" lg="6" md="6">
                    <v-card max-width="500" min-width="300" >
                        <v-img
                            src="@/assets/big-leaf.jpg"
                            :aspect-ratio="16/9"
                        ></v-img>
                    </v-card>
                </v-col>
            </v-row>


                <h2 class="heading grey--text text--darken-3">Contact Us</h2>
                <v-row class="mt-5">
                <v-col cols="12" sm="12" lg="6" md="6">
                  <v-card max-width="450" flat>
                      <v-card-text>
                          <v-form>
                              <v-text-field required color="green darken-3" label="Full name" v-model="fullname" filled></v-text-field>
                              <v-text-field required color="green darken-3" label="Email" type="email" v-model="email" filled></v-text-field>
                                <v-textarea filled
                                    name="description"
                                    required
                                    clearable
                                    label="Message"
                                    v-model="message"
                                    rows="5"
                                    row-height="30"
                                    type="text"
                                    color="green darken-3"
                                ></v-textarea>
                            <v-btn type="submit" block depressed color="success" filled dark>Send</v-btn>
                          </v-form>
                      </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="12" lg="6" md="6">
                    <ul class="contact-details">
                        <li>
                            PO Box 42559 00100
                        </li>
                        <li>
                            +254 705458766
                        </li>
                        <li>
                            Winston Place Nairobi Kenya
                        </li>
                        <li>
                            info@shadetree.com
                        </li>
                    </ul>
                </v-col>
            </v-row>
            </div>
        </v-content> 
        <v-footer height="auto" class="grey darken-3">
            <v-layout row wrap justify-center>
                <v-flex xs12 py-3 text-xs-center white--text>
                    &copy;2019 —
                    <strong>All rights reserved</strong>
                </v-flex>
            </v-layout>
        </v-footer>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'about',
    components: {
        NavBar,
        Footer
    },
    data () {
        return  {
            loggedIn: false,
            fullname: '',
            email: '',
            message: ''
        }
    }
}
</script>


<style lang="scss" scoped>
    .d-inline {
        display: inline;
    }

    .contact-details {
        display: inline-block;

        li {
            list-style: none;
            margin: 1em;
            line-height: 2;
        }
    }
</style>