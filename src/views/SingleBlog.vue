<template>
    <div>
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
            <div class="container" width="60%">
                <v-card class="mb-5">
                    <v-img :aspect-ratio="16/9" src="@/assets/big-leaf.jpg"></v-img>
                </v-card>
                <h3 class="display-1">{{post.data.title}}</h3>
                <p class="text-italic grey--text">{{ post.data.author.first_name }} + " " + {{post.data.author.second_name}}</p>

                <v-sheet v-html="post.data.body"></v-sheet>
            </div>
            <v-container>
               <router-link
                  v-if="post.meta.previous_post"
                  :to="/blog/ + post.meta.previous_post.slug"
                  class="button"
                >
                  {{ post.meta.previous_post.title }}
                </router-link>
                <router-link
                  v-if="post.meta.next_post"
                  :to="/blog/ + post.meta.next_post.slug"
                  class="button"
                >
                  {{ post.meta.next_post.title }}
                </router-link>
            </v-container>

        </v-content>
         <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { butter } from '@/buttercms'

export default {
    name: 'SingleBlog',
    components: {
        NavBar,
        Footer
    },
    data () {
        return  {
            loggedIn: true,
            post: {}
        }
    },
    methods: {
      getPost() {
        butter.post.retrieve(this.$route.params.slug)
          .then(res => {
            this.post = res.data
          }).catch(res => {
            console.log(res)
          })
      },
      getCategories () {
        butter.category.list()
        .then(res => {
          console.log('List of Categories:')
          console.log(res.data.data)
        })
       }
    },
    watch: {
      $route : {
        immediate: true,
         handler(to, from) {
          this.getPost()
        }
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
