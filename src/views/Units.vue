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
              <router-link to="/login" class="link">log in</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/signup" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>

      <v-content dark transition="fade-transition" app>
        <AdvertHeader/>
        <v-container
          style="min-height: 100vh;"
        >
          <v-row
           justify="center"
           class="d-flex flex-sm-column"
          >
            <v-col
              sm="12"
              lg="4"
            >
              <Search style="width: 100%"/>
            </v-col>

            <v-col
              sm="12"
              class="d-sm-none"
            >
              <v-select
                label="Sort"
                dense
                filled
                :items="items"
                hide-details
                menu-props="auto"
                :append-outer-icon="sortIcon"
                class="sortSelect"
                background-color="white"
                color="green darken-3"
                width="100%"
              >
              </v-select>
            </v-col>
          </v-row>

          <div class="selection">
            <h2 class="grey--text text--darken-3">Popular</h2>
          </div>
          
          <div class="grid">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </v-container>
        <div class="text-center my-8">
          <v-pagination
            v-model="page"
            :length="4"
            :prev-icon="menuLeft"
            :next-icon="menuRight"
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
import AdvertHeader from '@/components/AdvertHeader.vue'
import { mdiMagnify, mdiClose, mdiSortDescending, mdiMenuLeft, mdiMenuRight } from '@mdi/js';
import Search from '@/components/Search.vue'
import FilterQ from '@/components/FilterComponent.vue'

export default {
  name: 'Units',
  components: {
    NavBar,
    Footer,
    Card,
    AdvertHeader,
    Search,
    FilterQ
  },
  data () {
    return {
      mdiMagnify,
      headerImg: 'backround: url(@/assets/brick-wall.jpg)',
      mdiClose,
      page : 1,
      sortIcon: mdiSortDescending,
      menuLeft: mdiMenuLeft,
      menuRight: mdiMenuRight,
      items: ["Date", "Rating", "Price", "Location"],
      loggedIn: false
    }
  },
  methods : {
    searchInfo () {
      console.log("Search", this.search)
      this.search = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

.v-btn a {
  text-transform: uppercase;
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
      margin: 3em auto;

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
  
</style>
