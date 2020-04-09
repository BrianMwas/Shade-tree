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

      <v-content dark transition="fade-transition" app class="position-relative">

        

        <div class="p-2">
          <v-carousel dark :show-arrows="false" height="400" cycle>
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
        <v-container style="position: relative">
          <div class="text-right">
            <v-dialog 
              v-model="dialog"
              width="400"

              >
                <template v-slot:activator="{ on }">
                  <v-btn class="ml-3" fab color="blue" dark v-on="on">
                    <v-icon>
                      $custom
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar color="blue">
                    <v-toolbar-title  class="white--text">
                      Filter
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-radio-group v-model="sort" :mandatory="false">
                      <v-radio label="Latest" value="createdAt"></v-radio>
                      <v-radio label="Price" value="price"></v-radio>
                      <v-radio label="Term" value="term"></v-radio>
                      <v-radio label="Bathrooms" value="Bathrooms"></v-radio>
                      <v-radio label="Bedrooms" value="rooms"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-dialog>
          </div>
          
                <div v-if="gettingUnits" class="grid">
                    <v-sheet
                      color="grey lighten-4"
                      class="px-3 pt-3 pb-3"
                      data-aos="fade-down"
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
                      data-aos="fade-down"

                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                        color="grey lighten-4"
                      data-aos="fade-down"

                        class="px-3 pt-3 pb-3"
                      >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-sheet
                      data-aos="fade-down"
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
                      data-aos="fade-down"
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
                      data-aos="fade-down"
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
                <div class="h-50" v-else-if="units.results.length <= 0">
                  <div class="mt-16">
                    <p class="my-3 text-center">No units yet, Be the first to add one</p>
                    
                    <router-link class="button button-primary text-center" to="/login">Add A unit</router-link>
                  </div>
                  
                </div>
                <div v-else>
                  <h4 class="green--text text-darken-5 m-3">{{ sort }}</h4>
                  <v-divider class="grey my-3"></v-divider>
                  <div  class="grid" >
                    <home-unit
                      v-for="home in units.results"
                      :key="home.id"
                      :unit="home"
                    ></home-unit>
                  </div>
                </div>
                
        </v-container>
        
        
          <div class="text-center my-8">
            <v-pagination
              v-model="units.pageNumber"
              :length="units.pageCount"
              :prev-icon="menuLeft"
              :next-icon="menuRight"
              @input="getUnits"
            ></v-pagination>
          </div>
           
      </v-content>
      <Footer/>
      </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'
  import Footer from '@/components/Footer.vue'
  import Card from '@/components/HomeCard.vue'
  import { mdiMagnify, mdiClose, mdiSortDescending, mdiMenuLeft, mdiMenuRight } from '@mdi/js';
  import Search from '@/components/Search.vue';
  import AOS from "aos";

  import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
  const { mapGetters } = createNamespacedHelpers('auth');


  export default {
    name: 'Units',
    components: {
      NavBar,
      Footer,
      'home-unit': Card,
      Search
    },
    data () {
      return {
        snackbar: false,
        text: 'My timeout is set to 2000.',
        timeout: 2000,
        dialog: false,
        mdiMagnify,
        headerImg: 'backround: url(@/assets/brick-wall.jpg)',
        mdiClose,
        sort: 'All',
       

        sortIcon: mdiSortDescending,
        menuLeft: mdiMenuLeft,
        menuRight: mdiMenuRight,
        filter: "@/assets/filter.svg",
        items: ["Date", "Rating", "Price", "Location"],
        imageItems: [
            {
              src: 'https://source.unsplash.com/weekly?livingroom',
            },
            {
              src: 'https://source.unsplash.com/weekly?livingroom',
            },
            {
              src: 'https://source.unsplash.com/weekly?lawn',
            },
            {
              src: 'https://source.unsplash.com/weekly?home',
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
      getUnits() {
        // Units will begin from the latest
        let sortBy;
        if(this.sort == "Latest") {
          sortBy = "createdAt"
        }

        let payload = {
          sortBy,
          pageNumber: this.units.pageNumber
        }
        this.initUnits(payload.sortBy, payload.page)
      }
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
    },
    // Controls pagination for the units
    // watch: {
    //   pagination: {
    //     handler() {
    //       this.getUnits()
    //     },
    //     deep: true
    //   }
    // },
    created () {
      this.getUnits()
      AOS.init();
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';


  .h-50 {
    height: 50vh;
    display: flex;
    align-content: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
    }
  }

  .homes {
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 1.5em;
    

    .sidebar {
      background: white;

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
