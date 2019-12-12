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
              <router-link to="/products" class="link">products</router-link>
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
            <header
            >
            <v-img
                src="@/assets/big-leaf.jpg"
                aspect-ratio="16/9"
                height="100%"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"            
                >
            <div class="product-header-title">
                <h2 class="white--text display-2">Your Home to awesome products and decor</h2>
                <v-divider class="bg-white"></v-divider>
                <p class="h5 green--text text--lighten-1">Search through to find what can complement yor home</p>
            </div>
            </v-img>
            </header>
            <v-container height="auto">
              <v-row
                class="d-flex"
                justify="space-around"
              >
              <v-col
                lg="7"
                md="6"
                sm="6"
              >
              <Search/>
              </v-col>
              <v-col
                lg="5"
                md="6"
                sm="6"
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
            <h2 class="grey--text text--darken-3 my-5">Popular</h2>
          </div>
            <div class="grid" transition="slide-y-transition">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
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
import ProductCard from '@/components/ProductCard.vue';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import Search from '@/components/Search.vue'
import { mdiSortDescending, mdiMenuLeft, mdiMenuRight } from '@mdi/js'

export default {
    name: 'Products',
    components: {
        NavBar,
        ProductCard,
        Search,
        Footer
    },
    data () {
        return {
            items: ['Popular', 'new', 'Highest rated'],
            page: 1,
            loggedIn: false,
            sortIcon: mdiSortDescending,
            menuLeft: mdiMenuLeft,
            menuRight: mdiMenuRight
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/global.scss';

header {
    width: 100%;
    min-height: 45vh;
}


.product-header-title {
  padding: 2em;
}

.v-btn a {
  text-transform: uppercase;
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

@include media('>small', '<=medium') {
    .product-header-title {
        width: 70%;
        margin: auto 0;
        padding: 2em;
    }
}


@include media('>medium', '<=large') {
    .product-header-title {
        width: 60%;
        padding: 3em;
        text-align: center;
    }
}

@include media('>large') {
    .product-header-title {
        width: 40%;
        margin: auto 0;
        padding: 5em;
    }
}


.bg-white {
    background-color: white;
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