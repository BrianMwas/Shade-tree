<template>
    <div>
      <!-- Routes only visible when user is logged in -->
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
              <router-link to="/signup" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>
      <v-content app>
        <div class="container">
          <v-card 
            width="100%"
            class="mt-3"
          >
            <v-img 
              height="400"
              src="@/assets/seat.jpg"
              aspect-ratio="16/9"
            ></v-img>
          </v-card>

          <v-row>
            <v-col cols="12" sm="12" md="8" lg="8">
              <v-card flat>
                  <v-card-title primary-title class="d-flex display-1">
                    <span class="green--text font-weight-bold">{{unit.priceAnnual}}</span>
                    <v-spacer></v-spacer>
                    <span class="grey--text text--darken-1 rd">{{unit.streetname}}</span>
                  </v-card-title>
                  <v-card-subtitle>
                    Nairobi
                  </v-card-subtitle>
                  <v-card-text>
                      <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <div class="unit-detail">
                        <v-icon large color="cyan darken-5">{{date}}</v-icon>
                        <p class="grey--text h5 font-weight-light">Built <span class="green--text font-weight-normal">2018</span></p>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                      lg="4"
                    >
                    <div class="unit-detail">
                        <v-icon large color="red darken-1">{{bed}}</v-icon>
                        <p class="grey--text h5 font-weight-light">{{ unit.rooms }} <span class="green--text font-weight-normal">4</span></p>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                      lg="4"
                    >
                      <div class="unit-detail">
                        <v-icon large color="green darken-1">{{bathroom}}</v-icon>
                        <p class="grey--text h5 font-weight-light">{{ unit.bathrooms }} <span class="green--text font-weight-normal">1</span></p>
                      </div>
                      
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                      lg="4"
                    >
                      <div class="unit-detail">
                        <v-icon large color="green darken-1">{{square}}</v-icon>
                        <p class="grey--text h5 font-weight-light">{{ unit.area }}<span class="green--text font-weight-normal"><sup>sq</sup></span></p>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                      lg="4"
                    >
                      <div class="unit-detail">
                        <v-icon large color="grey darken-1">{{park}}</v-icon>
                        <p class="grey--text h5 font-weight-light">Parking <span class="green--text font-weight-normal">1</span></p>
                      </div>
                    
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                      lg="4"
                    >
                      <div class="unit-detail">
                        <v-icon large color="blue darken-1">{{shield}}</v-icon>
                        <p class="grey--text h5 font-weight-light">Area Safety <span class="green--text font-weight-normal">80%</span></p>
                      </div>
                    
                    </v-col>
                  </v-row>
                  </v-card-text>
                  
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-card flat>
                <v-card-title primary-title>
                  Description
                </v-card-title>
                <v-card-text>
                  <p>{{unit.description}}</p>
                  <v-card-actions>
                  <v-btn depressed color="blue white--text">
                    BOOK SITEVIEW
                  </v-btn>
                  <v-btn color="green white--text" depressed>SEND MESSAGE</v-btn>
                </v-card-actions>
                </v-card-text>
                
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6">
              <agent-card></agent-card>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-card>
                <v-card-title primary-title>
                  Map
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </div>
        
      </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import AgentCard from '@/components/AgentCard.vue'
import { mdiMapMarker, mdiBedSingleOutline, mdiToilet, mdiShareOutline, mdiShield, mdiParking, mdiCalendar, mdiVectorSquare } from '@mdi/js'

import { mapActions, mapState } from 'vuex';

export default {
  name: 'SingleUnit',
  components: {
    NavBar,
    'agent-card': AgentCard,
    Footer
  },
  data () {
    return {
      mapPin: mdiMapMarker,
      share: mdiShareOutline,
      bed: mdiBedSingleOutline,
      bathroom: mdiToilet,
      square: mdiVectorSquare,
      shield: mdiShield,
      park: mdiParking,
      date: mdiCalendar,
      loggedIn: false
    }
  },
  methods: {
    ...mapActions('unit', ['getUnitById']),
    ...mapState({
      unit: state => state.unit.unit
    }),
    getUnit() {
      this.getUnitById(this.$route.params.id)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.getUnit()
      }
    }
  } 
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

  .container-fluid {
    width: 95%;
    margin: 0 auto;
    padding: 1em 0;
  }

  .link {
    text-transform: uppercase;
  }

  .unit-details {
    display: inline-block;
  }
  

  .rd {
    @include media('<=medium') {
      font-size: 1.2rem !important;
    }
  }
</style>
