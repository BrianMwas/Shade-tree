<template>
    <div>
       <v-navigation-drawer
            v-model="drawer"
            app
            temporary
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  Category
                </v-list-item-title>
                <v-list-item-subtitle>
                  Filter through our categories
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="grey lighten-4"></v-divider>
            <v-list
              dense
              nav
            >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
      </v-navigation-drawer>
      <v-app-bar
            color="green darken-1"
            dark
            app
            elevate-on-scroll
      >
        <v-btn @click="drawer = !drawer" class="hidden-md-and-up" icon><v-icon>{{ menu }}</v-icon></v-btn>

        <v-toolbar-title>Shade tree</v-toolbar-title>

        <v-spacer></v-spacer>
       <v-toolbar-items class="d-none d-md-flex d-lf-flex">
         <v-btn text>Blog</v-btn>
         <v-btn text>Map</v-btn>
         <v-btn text>Products</v-btn>
         <v-btn text>Log In</v-btn>
         <v-btn text>Sign Up</v-btn>
       </v-toolbar-items>
      </v-app-bar>

    </div>
</template>

<script>
import { mdiMagnify, mdiMenu, mdiFilterVariant } from '@mdi/js'

export default {
  name: 'navigation',
  data () {
    return {
      title: 'Shade tree',
      drawer: false,
      menu: mdiMenu,
      items: [
        { title: 'Home', icon: mdiFilterVariant },
        { title: 'Categories', icon: mdiMagnify }
      ]
    }
  }
}
</script>

<style lang="scss">
  header {
    padding: 2em auto;
  }
</style>
