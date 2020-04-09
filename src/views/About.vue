<template>
    <div>
       <NavBar v-if="loggedIn" #loggedInRoutes>
           <v-btn v-if="loggedInUserType == 'admin'">
                <router-link to="/admin">Admin</router-link>
            </v-btn>
            <v-btn text>
                <router-link to="/units" class="link">Units</router-link>
            </v-btn>
            <v-btn text>
                <router-link to="/blogs" class="link">Blogs</router-link>
            </v-btn>
         <v-btn v-if="loggedInUserType == 'owner'" text>
           <router-link to="/newunit" class="link">Add Unit</router-link>
         </v-btn>
         <v-menu  transition="slide-y-transition" open-on-click>
            <template v-slot:activator="{ on }">
              <v-btn text dark v-on="on">
                {{ loggedInUser.username }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/dashboard/userprofile">
                Profile
              </v-list-item>
              <v-list-item @click="logOutUser">
                Log out
              </v-list-item>
            </v-list>
          </v-menu>
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
            <v-container class=" mt-5">
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
                          <v-toolbar color="green darken-1">
                              <v-toolbar-title class="white--text">
                                  Send us a message
                              </v-toolbar-title>


                          </v-toolbar>
                          <v-card-text class="my-3">
                              <v-form @submit.prevent="sendMessage">
                                  <v-text-field 
                                    outlined 
                                    required 
                                    type="text"
                                    name="fullname"
                                    color="green darken-3" 
                                    label="Full name" 
                                    v-model="fullname">
                                    </v-text-field>
                                  <v-text-field 
                                  outlined 
                                  required 
                                  name="email"
                                  color="green darken-3" 
                                  label="Email" 
                                  type="email" 
                                  v-model="email"></v-text-field>
                                    <v-textarea 
                                    outlined
                                        
                                        required
                                        name="message"
                                        clearable
                                        label="Message"
                                        v-model="message"
                                        rows="5"
                                        row-height="30"
                                        type="text"
                                        color="green darken-3"
                                    ></v-textarea>
                                <v-btn type="submit" block depressed color="success" outlined dark>Send</v-btn>
                              </v-form>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="12" lg="6" md="6">
                        <v-sheet class="p-3">
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
                        </v-sheet>
                        
                    </v-col>
                </v-row>
                <div id="faqs" class="my-5">
                    <h2 class="heading black--text">FAQS</h2>
                    <v-expansion-panels class="my-3">
                        <v-expansion-panel
                        >
                        <v-expansion-panel-header>Do I need to pay anything?</v-expansion-panel-header>
                            <v-expansion-panel-content class="font-weight-light">
                                You don't need to pay anything. Do not pay anything to anyone for any service all companies only showcase their units as a means of advertising.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel
                        >
                        <v-expansion-panel-header>I can't see the maps</v-expansion-panel-header>
                            <v-expansion-panel-content class="font-weight-light">
                                Location functionality has not been added yet but its under development. Contact the agents under the companies.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header>How can I advertise my units</v-expansion-panel-header>
                            <v-expansion-panel-content class="font-weight-light">
                                You can start by registering as a company. You can click a link in the sign up page for the right link.
                                Everything else will follow
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header class="heading">How do I add an apartment</v-expansion-panel-header>
                            <v-expansion-panel-content class="font-weight-light">
                                After you have registered you will be prompt by the website for further details. That is after you have logged in.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            
            </v-container>
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
import { mapState, mapGetters, mapActions } from "vuex"

export default {
    name: 'about',
    components: {
        NavBar,
        Footer
    },
    data () {
        return  {
            
            fullname: '',
            email: '',
            message: ''
        }
    },
    methods: {
        sendMessage() {
            let data = {
                fullname: this.fullname,
                email: this.email,
                message: this.message
            }

            console.table(data);
            this.fullname = this.email = this.message = ""
        },
        ...mapActions('auth', ['logOutUser'])
    },
    computed: {
        ...mapState({
            loggedIn : state => state.auth.status
        }),
      ...mapGetters('auth', ['loggedInUser', 'loggedInUserType', 'logged']),

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

    .v-expansion-panel--active > .v-expansion-panel-header {
        font-weight: 700;
    }

    .v-expansion-panel-content__wrap {
        font-size: 13px;
    }
</style>