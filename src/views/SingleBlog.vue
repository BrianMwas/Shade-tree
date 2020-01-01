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
                <h3 class="display-1">HomeDecor</h3>
                <p class="text-italic grey--text">Published on December 23 2019</p>

                <v-card flat>
                    <v-card-text>
                        <p class="grey--text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident quidem sit modi facilis suscipit illum similique molestias. Ex cumque error voluptatibus facere laborum qui reprehenderit delectus optio repudiandae autem, voluptatum nesciunt consequuntur quasi dignissimos animi repellat sit omnis? Quidem 
                            doloribus expedita sit neque enim ab hic provident accusantium quaerat at!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione suscipit, neque eos molestiae iusto accusantium illum doloribus necessitatibus molestias ducimus eum! Optio corrupti voluptatum ullam nisi eveniet id labore nobis sunt minus placeat provident delectus, nostrum officia eum, facilis fugiat!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolor iste quasi a at maiores, eum, veniam et sapiente totam expedita libero iusto consectetur non ducimus. In, molestiae. Necessitatibus nam voluptas earum magnam ipsa quaerat nobis illo voluptatibus voluptatum ea, soluta vitae et laborum maxime doloribus sequi culpa consequuntur ipsam numquam inventore quis? Suscipit, quos. Minima in saepe nam cum?</p>
                    </v-card-text>
                </v-card>
            </div>
        </v-content>
         <Footer/> 
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: 'SingleBlog',
    components: {
        NavBar,
        Footer
    },
    data () {
        return  {
            loggedIn: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>