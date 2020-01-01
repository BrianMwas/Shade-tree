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
        <v-content dark transition="slide-x-reverse-transition" app>
          <v-container style="min-height: 60vh">
            <div class="d-flex" justify="center" style="margin: 4.6em auto">
              <SignUpCard/>
            </div>
            <v-menu class="p-absolute" transition="slide-x-transition" open-on-click>
            <template v-slot:activator="{ on }">
              <v-btn color="info" dark v-on="on">
                Sign up as
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="{ path:'/signup',query:{userType:'agent'} }">
                Agent
              </v-list-item>
              <v-list-item :to="{ path:'/signup',query:{userType:'company'} }">
                Company
              </v-list-item>
            </v-list>
          </v-menu>
          </v-container>
          
          
        </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import SignUpCard from '@/components/SignUpCard.vue'

export default {
  name: 'SignUp',
  components: {
    NavBar,
    SignUpCard,
    Footer
  },
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="scss" scoped>

.text-center {
  text-align: center;
}

.p-absolute {
  position: absolute !important;
  right: 20px;
  top: 15px;
}


.link-usertype:hover {
  color: rgb(0, 68, 255) !important;
}

</style>
