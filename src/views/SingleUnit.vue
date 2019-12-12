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
        <div class="wrapper">
          <div class="image">
          </div>
          <div class="details">
            <div class="unit-details">
              unit details
            </div>
            <div class="description">
              description
            </div>
          </div>
          <div class="agent">
            agent
          </div>
          <div class="map">
            map
          </div>
        </div>
      </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import AgentCard from '@/components/AgentCard.vue'
import { mdiMapMarker, mdiBedSingleOutline, mdiToilet, mdiShareOutline } from '@mdi/js'

export default {
  name: 'SingleUnit',
  components: {
    NavBar,
    AgentCard,
    Footer
  },
  data () {
    return {
      mapPin: mdiMapMarker,
      share: mdiShareOutline,
      bed: mdiBedSingleOutline,
      bathroom: mdiToilet,
      loggedIn: false
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

  .wrapper {
    width: 80%;
    margin: 2em auto auto;
    display: grid;
    grid-template-rows: 400px repeat(3, 200px);
    row-gap: 1em;

    .image {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
      background-color: coral;
    }

    .details {
      background-color: lightgreen;
      grid-column: 1 / 3;
      display: grid;
      grid-template-columns: repeat(2, minmax(200px, 1fr));


      .unit-details {
        background-color: lightseagreen;
      }

      .description {
        background-color: lightyellow;
      }
    }

    .agent {
      background-color: grey;
      grid-column: 1/ 3;
    }

    .map {
      grid-column: 1 / 3;
      background-color: purple;
      justify-content: center;
    }
  }
  
</style>
