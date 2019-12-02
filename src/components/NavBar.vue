<template>
    <div>
       <v-navigation-drawer
            v-model="drawer"
            app
            temporary
            :value="true"
            background-color="grey darken-1"
          >
              <v-img :aspect-ratio="16/9" src="@/assets/Waimakariri.png" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"      
                  >
                <v-row align="end" class="lightbox white--text pa-2 fill-height">
                  <v-col>
                    <div class="subheading white--text font-weight-bold">Shade tree</div>
                    <div class="body-1 " >Welcome to Shade tree</div>
                  </v-col>
                </v-row>
              </v-img>
              <v-list >
                <template v-for="(item, i) in items">
                  <v-divider v-if="item.divider" :key="i"></v-divider>
                  <v-list-item v-else :key="item.title" color="primary" @click="goto(item.title)">
                    <v-list-item-action>
                      <v-icon color="green">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </template>
            </v-list>
      </v-navigation-drawer>
      <v-app-bar
            dark
            app
            elevate-on-scroll
      >
        <v-btn @click="drawer = !drawer" class="hidden-md-and-up" icon><v-icon>{{ menu }}</v-icon></v-btn>

        <v-toolbar-title to="/">Shade tree</v-toolbar-title>

        <v-spacer></v-spacer>
       <v-toolbar-items class="d-none d-md-flex d-lf-flex">
         <slot v-bind:link="link">
           <v-btn text>
            <router-link :to="'/' + link" class="link">{{ link }}</router-link>
          </v-btn>
         </slot>
         <slot name="loggedInRoutes" v-bind:link="link">
            <v-btn text>
              <router-link :to="'/' + link" class="link">link</router-link>
            </v-btn>
         </slot>
         <!-- <v-btn text>
           <router-link to="/units" class="link">units</router-link>
         </v-btn>
         <v-btn text>
           <router-link to="/map" class="link">map</router-link>
         </v-btn>
         <v-btn text>
           <router-link to="/products" class="link">products</router-link>
         </v-btn>
         
         <v-btn text>
           <router-link to="/login" class="link">log in</router-link>
         </v-btn>
         <v-btn text>
           <router-link to="/signup" class="link">Sign up</router-link>
         </v-btn> -->
       </v-toolbar-items>
      </v-app-bar>

    </div>
</template>

<script>
import { mdiMagnify, mdiShopping, mdiMenu, mdiMapMarker, mdiEqualizerOutline, mdiHome, mdiPhoneAlert, mdiNewspaper, mdiAccount, mdiLogin,  } from '@mdi/js'

export default {
  name: 'NavBar',
  data () {
    return {
      title: 'Shade tree',
      drawer: false,
      menu: mdiMenu,
      items: [
        { title: 'Home', icon: mdiHome },
        { title: 'Categories', icon: mdiEqualizerOutline },
        { title: 'Blogs', icon: mdiNewspaper },
        { title: 'Products', icon: mdiShopping },
        { title: 'Map', icon: mdiMapMarker },
        { title: 'Log in', icon: mdiLogin },
        { title: 'Sign Up', icon: mdiAccount },
        { title: 'Contact Us', icon: mdiPhoneAlert },
      ]
    }
  },
  methods : {
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
    }
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
</style>
