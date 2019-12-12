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
              <router-link to="/products" class="link">products</router-link>
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
            <div class="my-16 mx-a container" justify="center">
                <AddProduct/>
            </div>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddProduct from '@/components/AddProduct.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'add-product',
    components: {
        NavBar,
        AddProduct,
        Footer
    },
    data () {
        return  {
            loggedIn: false
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/global.scss';

    .my-16 {
        margin: 16 auto;
    }

    .mx-a {
        margin-left: auto;
        margin-right: auto; 
    }
</style>