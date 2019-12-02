<template>
    <div>
      <NavBar/>
      <v-content app>
        <AdvertHeader/>
        <v-container
          style="min-height: 100vh;"
        >
          <v-row
          class="d-flex"
           justify="space-around"
          >
            <v-col
              lg="7"
              md="6"
              sm="12"
              xs="12"
            >
              <Search/>
            </v-col>
            <v-col
              lg="5"
              md="6"
              sm="12"
              xs="12"
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
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
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
import { mdiMagnify, mdiClose, mdiSortDescending } from '@mdi/js';
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
      items: ["Date", "Rating", "Price", "Location"]
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

  .text-dark {
    color: color(typography, 4);
  }

  .sortSelect {
    float: right;
  }

  @supports (display: grid) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
      grid-auto-rows: 300px;
      grid-gap: 50px;
      margin: 3em auto;
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
