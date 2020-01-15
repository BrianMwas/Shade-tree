<template>
    <div>      
        <!-- Routes only visible when user is logged in -->
        <NavBar v-if="logged" #loggedInRoutes>
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
            LOG OUT
           </v-btn>
           <!-- <v-btn text v-if="loggedInUserType == 'owner'">
             <router-link to="/logout" class="link">Add Unit</router-link>
           </v-btn> -->
        </NavBar>
        <NavBar v-else #default>
          <v-btn text>
            <router-link to="/blogs" class="link">blogs</router-link>
           </v-btn>
            <v-btn text>
              <router-link to="/units" class="link">units</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/login" class="link">log in</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/signup" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>

      <v-content dark transition="fade-transition" app>

        <div class="p-2">
          <v-carousel :show-arrows="false" height="400" cycle>
            <v-carousel-item
              v-for="(item,i) in imageItems"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"

            ></v-carousel-item>
           </v-carousel>
        </div>

        <v-snackbar
          v-for="alert in alerts"
          :key="alert.mKey"
          bottom
          left
          v-model="alert.stage"
          :color="alert.type"
        >
          {{alert.message}}
          <v-btn flat color="primary" @click.native="alert.stage = false">Close</v-btn>
        </v-snackbar>
        
          <div class="homes">
            <div class="sidebar">
              <h2 class="header black--text">Filter</h2>
              <v-card tile flat>
                <v-card-text>
                  <h4 class="black--text font-weight-light">By Date</h4>
                  <v-radio-group :mandatory="false" v-model="dateSelection">
                    <v-radio label="Latest" value="latest" color="primary"></v-radio>
                    <v-radio label="Earliest" value="Earliest" color="primary"></v-radio>
                  </v-radio-group>
                  <h4 class="black--text font-weight-light">By Price</h4>
                  <v-radio-group :mandatory="false" v-model="pricingSelection">
                    <v-radio label="Highest" value="high-priced" color="primary"></v-radio>
                    <v-radio label="Low" value="low-priced" color="primary"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </div>
            <div class="units">
              <div class="header">
                  <h2 class="heading mx-5 black--text">{{ pricingSelection || 'AllUnits' || pricingSelection }}</h2> 
              </div>
              <div class="results">
                <div v-if="gettingUnits" class="grid">
                    <v-sheet
                      color="grey lighten-4"
                      class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                        color="grey lighten-4"
                        class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                        color="grey lighten-4"
                        class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                        color="grey lighten-4"
                        class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                        color="grey lighten-4"
                        class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                        color="grey lighten-4"
                        class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                </div>
                <div v-else class="grid" >
                  <home-unit
                    v-for="home in units.results"
                    :key="home.id"
                    :unit="home"
                  ></home-unit>
                </div>
              </div>
              <div class="footer">
                <div class="text-center my-8">
                  <v-pagination
                    v-model="units.pageNumber"
                    :length="units.pageCount"
                    :prev-icon="menuLeft"
                    :next-icon="menuRight"
                  ></v-pagination>
                </div>
              </div>
            </div>
          </div>
      </v-content>
      <Footer/>
      </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/HomeCard.vue'
import AdvertHeader from '@/components/AdvertHeader.vue'
import { mdiMagnify, mdiClose, mdiSortDescending, mdiMenuLeft, mdiMenuRight } from '@mdi/js';
import Search from '@/components/Search.vue'

import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'Units',
  components: {
    NavBar,
    Footer,
    'home-unit': Card,
    AdvertHeader,
    Search
  },
  data () {
    return {
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      mdiMagnify,
      headerImg: 'backround: url(@/assets/brick-wall.jpg)',
      mdiClose,
      page : 1,
      sortIcon: mdiSortDescending,
      menuLeft: mdiMenuLeft,
      menuRight: mdiMenuRight,
      items: ["Date", "Rating", "Price", "Location"],
      imageItems: [
          {
            src: 'https://source.unsplash.com/random/livingroom',
          },
          {
            src: 'https://source.unsplash.com/random/daily?livingroom',
          },
          {
            src: 'https://source.unsplash.com/random/?house',
          },
          {
            src: 'https://source.unsplash.com/random/weekly?livingroom',
          },
        ],
        pricingSelection: null,
        dateSelection: null,
    }
  },
  methods : {
    searchInfo () {
      console.log("Search", this.search)
      this.search = ''
    },
    ...mapActions('auth', ['logOutUser']),
    ...mapActions('unit', ['initUnits']),
  },
  computed: {
    ...mapState({
        loggedIn: state => state.auth.status,
        settingProfile: state => state.profile.settingUserProfile,
        units: state => state.unit.units,
        gettingUnits:state => state.unit.gettingUnits,
        alerts: state => state.alert.Messages
      }),
    ...mapGetters(['loggedInUser', 'loggedInUserType', 'logged'])   
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

  .homes {
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 1.5em;
   

    .sidebar {
      backround: white;

      @include media('<medium') {
        display: none;
        pointer-events: none;
      }
    }

    .units {
      
      display: grid;
      grid-template-columns: 1fr;
     
      .header {
        grid-row: span 1;
      }

      .results {

        grid-row: span 10;
      }

      .footer {
        grid-row: span 1;
      }
    }
  }


.v-btn a {
  text-transform: uppercase;
}
  .advert {
    width: 100%;
    margin: auto;
    padding: 0 10%;
  }
 

  .text-dark {
    color: color(typography, 4);
  }

  .sortSelect {
    float: right;
  }

  .d-sm-none {
    @include media('>small') {
      display: none !important;
    }
  }
  .row {
    flex-direction: row;
    justify-content: space-around;
    padding: 1em;

     @include media('>small') {
       flex-direction: column !important;
    }
  }
 

  @supports (display: grid) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
      grid-auto-rows: 300px;
      grid-gap: 50px;
      margin: 1em auto;

      @include media('>medium') {
        grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
      }
    }
  }

  @supports not (display: grid) {
    .grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      
      @include media('>medium') {
        flex-direction: row;
      }

      @include media('>small', '<=medium') {
        flex-direction: column;
      }
    }
  }

  .selection {
    position: relative;

    h2 {
      margin-top: 0; 
    }

    &::after {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      float: left;
      background: dimgray;
      content: '';
      bottom: -10px;
      left: 0;
    }
  }
  

  .v-image__image--cover  {
    backround-size: 100% auto !important;
  }
</style>
