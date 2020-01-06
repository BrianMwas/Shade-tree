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
                    <v-btn dark icon class="mr-4">
                      <v-icon>{{ pencil }}</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-spacer></v-spacer>

                  <v-card-title class="white--text pl-12 pt-12">
                    <div class="pt-12 ">{{user}}</div>
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
                
                <div v-if="loggedIn">
                    <v-list-item>
                    <v-list-item-icon>
                      <v-icon>{{ mdiPlusBox }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title >Manage Units</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>{{ mdiShoppingSearch }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>My purchases</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>{{ mdiLogout }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title @click="logOutUser">Log out</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </div>

                <div v-else>
                  <v-list-item to="/login">
                  <v-list-item-icon>
                    <v-icon>{{ mdiLogin }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >Log In</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item to="/signup">
                  <v-list-item-icon>
                    <v-icon>{{ mdiAccount }}</v-icon>
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
                    <v-icon>{{ mdiPhone }}</v-icon>
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

        <v-toolbar-title>Shade tree</v-toolbar-title>

        <v-spacer></v-spacer>
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
import { mdiMagnify, 
mdiShopping, mdiPencil, mdiMenu, 
mdiMapMarker, mdiEqualizerOutline, mdiPhoneAlert, mdiNewspaper, 
mdiAccount, mdiLogin, mdiLogout, mdiShoppingSearch, mdiPlusBox, mdiPhone  } from '@mdi/js'
import { mapState } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'NavBar',
  props: ['loggedIn', 'user'],
  data () {
    return {
      title: 'Shade tree',
      drawer: false,
      menu: mdiMenu,
      pencil: mdiPencil,
      mdiLogin,
      mdiPlusBox,
      mdiAccount,
      mdiShoppingSearch,
      mdiLogout,
      mdiPhone,
      items: [
          {
            action: mdiEqualizerOutline,
            show: true,
            title: 'Category',
            active: true,
            
            items: [
              { title: 'Single rooms', link: 'single-rooms' },
              { title: 'Double rooms', link: 'double-rooms' },
              { title: 'Master ensuite', link: 'master-ensuite' },
              { title: 'Stalls', link: 'stalls' },
              { title: 'Workspaces', link: 'workspaces' }
            ],
          },
          // {
          //   action: mdiShopping,
          //   show: true,
          //   title: 'Products',
          //   items: [
          //     {title : 'Garden flowers'},
          //     {title: 'Green plants' },
          //     {title : 'Wallpapers' },
          //     { title: 'Paint' },
          //     { title: 'Plant pots' }
          //   ]
          // },
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
    showR () {
      return this.loggedIn;
    }
  },
  // computed: {
  //   ...mapState({
  //     loggedIn: state => state.auth.status.loggedIn,
  //     loggedInUser: state => state.auth.user
  //   })
  // }
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
