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
          
            <v-container transition="slide-x-transition">
                <BlogCard title="Home decor"/>
                <BlogCard title="Choosing the right paint"/>
                <BlogCard title="What tile goes with your living room"/>
                <BlogCard title="Getting started to DIY"/>
                <BlogCard title="dIY your own kitchen garden"/>
                <BlogCard title="Cleaning your walls"/>
                <BlogCard title="finding the right toilet seat"/>
                <v-pagination
                    v-model="page"
                    :length="4"
                    :prev-icon="menuLeft"
                    :next-icon="menuRight"
                ></v-pagination>
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import BlogCard from '@/components/BlogCard.vue'
import Footer from '@/components/Footer.vue'
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js'


export default {
    name: 'Blog',
    components: {
        BlogCard,
        NavBar,
        Footer
    },
    data () {
        return {
            page: 1,
            menuLeft: mdiMenuLeft,
            menuRight: mdiMenuRight,
            loggedIn: false
        }
    }
}
</script>


<style lang="scss" scoped>

</style>