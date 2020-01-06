<template>
    <div>
        <!-- Routes only visible when user is logged in -->
        <NavBar v-if="loggedIn" #loggedInRoutes>
          <v-btn text>
            <router-link to="/dashboard" class="link">dashboard</router-link>
          </v-btn>
         <v-btn text>
            <router-link to="/units" class="link">units</router-link>
          </v-btn>
         
           <v-btn text>
            <router-link to="/blogs" class="link">blogs</router-link>
           </v-btn>
           <v-btn text @click="logOutUser">
             Log Out
           </v-btn>
           <v-btn text v-if="loggedInUserType == 'owner'">
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
                <div v-for="(blog, index) in blogs" :key="index">
                  <BlogCard class="my-5" :blog="blog"/>
                </div>
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

import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
  const { mapGetters } = createNamespacedHelpers('auth');
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
            blogs: [
              {
                title: "Blog one",
                subtitle: "blog subtitle",
                summary: "lorem ipsum lorem ipsum",
                author: "brian",
                publishDate: "June, 2013",
                tags: ["walls", "paint", "color"]

              }

            ]
        }
    },
    methods: {
      ...mapActions('auth', ['logOutUser'])
    },
    computed: {
      ...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
      ...mapState({
        loggedIn: state => state.auth.status,
        settingProfile: state => state.profile.settingUserProfile,
      })
    }
}
</script>


<style lang="scss" scoped>

</style>