<template>
    <div>
        <!-- Routes only visible when user is logged in -->
        <NavBar v-if="logged" #loggedInRoutes>
          <v-btn text>
            <router-link to="/dashboard" class="link">dashboard</router-link>
          </v-btn>
         <v-btn text>
            <router-link to="/units" class="link">units</router-link>
          </v-btn>
         
           <v-btn text>
            <router-link to="/blogs" class="link">blogs</router-link>
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
                <h2 class="grey--text text--darken-4 font-weight-bold display-1 my-5">{{ page_title }}</h2>
                <div v-for="(post, index) in posts" :key="post.slug + '_' + index">
                  <BlogCard class="my-5" :blog="post"/>
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
import { butter } from '@/buttercms';

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

              },
              {
                title: "Blog one",
                subtitle: "blog subtitle",
                summary: "lorem ipsum lorem ipsum",
                author: "brian",
                publishDate: "June, 2013",
                tags: ["walls", "paint", "color"]

              },
              {
                title: "Blog one",
                subtitle: "blog subtitle",
                summary: "lorem ipsum lorem ipsum",
                author: "brian",
                publishDate: "June, 2013",
                tags: ["walls", "paint", "color"]

              },
              {
                title: "Blog one",
                subtitle: "blog subtitle",
                summary: "lorem ipsum lorem ipsum",
                author: "brian",
                publishDate: "June, 2013",
                tags: ["walls", "paint", "color"]

              },
              {
                title: "Blog one",
                subtitle: "blog subtitle",
                summary: "lorem ipsum lorem ipsum",
                author: "brian",
                publishDate: "June, 2013",
                tags: ["walls", "paint", "color"]

              }

            ],
            posts: [],
            page_title: 'Blog'
        }
    },
    methods: {
      ...mapActions('auth', ['logOutUser']),
      getPosts() {
        butter.post.list({
          page: 1,
          page_size: 10
        }).then(res => {
          this.posts = res.data.data
        })
      },
      getCategories() {
        butter.category.list()
          .then(res => {
            console.log('List of Categories:')
            console.log(res.data.data)
          })
      },
      getPostsByCategory() {
        butter.category.retrieve('example-category', {
            include: 'recent_posts'
          })
          .then(res => {
            console.log('Posts with specific category:')
            console.log(res)
          })
      }
    },
    computed: {
      ...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
      ...mapState({
        loggedIn: state => state.auth.status,
        settingProfile: state => state.profile.settingUserProfile,
      })
    },
    created () {
      this.getPosts(),
      this.getCategories(),
      this.getPostsByCategory()
    }
}
</script>


<style lang="scss" scoped>

</style>