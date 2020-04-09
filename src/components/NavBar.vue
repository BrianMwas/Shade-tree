<template>
    <div>
       <v-navigation-drawer
            v-model="drawer"
            app
            temporary
            :value="true"
            background-color="grey darken-1"
          >
          <v-img
                src="@/assets/Waimakariri.png"
                :aspect-ratio="16/9"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                dark
                v-if="loggedIn"
              >
                <v-row class="fill-height" align="end">
                  <v-card-title>
                    <v-btn dark icon class="mr-4" @click="gotoProfile">
                      <v-icon>{{ pencil }}</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-spacer></v-spacer>

                  <v-card-title class="white--text pl-12 pt-12">
                    <div class="pt-12 pr-3 text-transform-capitalize font-weight-bold">{{user}}</div>
                  </v-card-title>
                </v-row>
              </v-img>
              <v-img v-else  :aspect-ratio="16/9" src="@/assets/Waimakariri.png" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                <v-row align="end" class="lightbox white--text pa-2 fill-height">
                  <v-col>
                    <div class="subheading white--text font-weight-bold">Shade tree</div>
                    <div class="body-1 " >Welcome to Shade tree</div>
                  </v-col>
                </v-row>
              </v-img>
              
              <v-list shaped>
                  <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    v-model="item.active"
                    :prepend-icon="item.action"
                    no-action
                  >
                  <template v-slot:activator >
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item  :to="subItem.link" v-for="subItem in item.items" :key="subItem.title">
                    <v-list-item-content>
                      <v-list-item-title   v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>

                <v-list-item to="/units">
                    <v-list-item-icon>
                      <v-icon color="blue">{{ mdiHome }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title >Units</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                
                <div v-if="loggedIn">
                    <v-list-item to="/dashboard">
                    <v-list-item-icon>
                      <v-icon color="blue">{{ mdiViewDashboard }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title >Dashboard</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>


                    <v-list-item v-if="loggedInUserType == 'owner'"  to="/dashboard/company-profile">
                      <v-list-item-icon>
                        <v-icon color="blue">{{ setting }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Company profile</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/dashboard/userprofile">
                      <v-list-item-icon>
                        <v-icon color="blue">{{ mdiFaceProfile }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>My profile</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon color="blue">{{ mdiLogout }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title @click="logOutUser">Log out</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </div>

                <div v-else>
                  <v-list-item to="/login">
                  <v-list-item-icon>
                    <v-icon color="blue">{{ mdiLogin }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >Log In</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item to="/signup">
                  <v-list-item-icon>
                    <v-icon color="success">{{ mdiAccount }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Sign Up</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </div>
            </v-list>
            <v-spacer></v-spacer>
            <v-list-item to="/about-us">
                  <v-list-item-icon>
                    <v-icon color="grey darken-1">{{ mdiPhone }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Get in touch</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
      </v-navigation-drawer>

      <v-app-bar
            dark
            app
            elevate-on-scroll
      >
        <v-btn @click="drawer = !drawer" class="hidden-md-and-up" icon><v-icon>{{ menu }}</v-icon></v-btn>

        <v-toolbar-title class="hidden-sm-and-down">Shade tree</v-toolbar-title>

        <v-spacer></v-spacer>
         <search :dta="allUnits"></search>
          <v-toolbar-items class="d-none d-md-flex d-lf-flex">
               
                 <slot>
                 </slot>
                 <slot name="loggedInRoutes">
                 </slot>
         </v-toolbar-items>
      </v-app-bar>
    </div>
</template>

<script>
import { mdiMagnify, mdiFaceProfile, mdiViewDashboard,
 mdiPencil, mdiMenu, mdiEqualizerOutline, mdiPhoneAlert, mdiNewspaper, 
mdiAccount, mdiLogin, mdiLogout,  mdiPhone,mdiSettingsBox, mdiHome  } from '@mdi/js'
import { mapState } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('auth')

import Search from '@/components/Search'

export default {
  name: 'NavBar',
  props: ['loggedIn', 'user'],
  components: {
    "search" : Search
  },
  data () {
    return {
      title: 'Shade tree',
      drawer: false,

      // Icons 
      menu: mdiMenu,
      pencil: mdiPencil,
      mdiLogin,
      mdiAccount,
      mdiFaceProfile,
      mdiLogout,
      mdiPhone,
      mdiHome,
      mdiViewDashboard,
      setting: mdiSettingsBox,

      // Rest of the data
      allUnits: null,
      // Links
      items: [
          {
            action: mdiEqualizerOutline,
            show: true,
            title: 'Category',
            active: true,
            
            items: [
              { title: 'Apartment', link: '/units/search?category=Apartment' },
              { title: 'Master ensuite', link: '/units/search?category=Mansionette' },
              { title: 'Bedsitter', link: '/units/search?category=Bedsitter'},
                { title: 'Single room', link: '/units/search?category=Single room'},
                  { title: 'Double room', link: '/units/search?category=Double room'},
              { title: 'Stalls', link: '/units/search?category=Stall' },
              { title: 'Workspaces', link: '/units/search?category=Workspace' }
            ],
          },
    
          {
            action: mdiNewspaper,
            show: true,
            title: 'Blog',
            items: [
              { title: 'Paint' }, { title: 'Wallpaper' }, { title: 'Tiles' }, { title: 'Bathrooms' } 
            ],
          }
        ],
    }
  },
  methods : {
    ...mapActions(['logOutUser']),
    goto(link) {
      let route = link.toLowerCase();
      if(route === 'log in') {
        this.$router.push('login')
      } else if(route === 'sign up') {
        this.$router.push('signup')
      } else if(route === 'home') {
        this.$router.push('/')
      } 
      else {
        this.$router.push(route)
      }
    },
    gotoProfile() {
      this.$router.push('/dashboard/userprofile')
    },
    showR () {
      return this.loggedIn;
    },
    setUnits() {
      if(typeof this.units == Object) {
        this.allUnits = [this.units];
      } else {
        this.allUnits = this.units;
      }
      console.log("units nav", this.allUnits)
    }
  },
  computed: {
    ...mapState({
      units: state => state.unit.units.results
    }),
    ...mapGetters(['loggedInUserType'])
  },
  created() {
    this.setUnits()
  }
}
</script>

<style lang="scss">
  header {
    padding: 2em auto;
  }


  .v-application .link, a {
    text-decoration: none !important;
    color: white;
    transition: color 200ms ease-in;

    &:hover {
      color: rgb(143, 255, 109);
    }
  }

  .sidebar--list-enter-active, .sidebar--list-leave-active {
    transition: all 1s;
  }

  .sidebar--list-enter, sidebar--list-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
