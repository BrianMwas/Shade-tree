<template>
    <div>
      <NavBar/>
      <v-content>
        <v-container>
            <v-text-field
              v-model="search"
              label="Search"
              outlined
              color="green lighten-1"
              maxlength="10"
              :rules="[rules.counter]"
              width="300"
              counter="10"
              :append-icon="mdiMagnify"
              @click:append="searchInfo"
              max-width="400"
            ></v-text-field>
            <v-row justify-space-around>
              <v-col
                sm="12"
                md="2"
                lg="4"
                xl="5"
              >
                <Card/>
              </v-col>
              <v-col
                sm="12"
                md="2"
                lg="4"
                xl="5"
              >
                <Card/>
              </v-col>
              <v-col
                sm="12"
                md="2"
                lg="4"
                xl="5"
              >
                <Card/>
              </v-col>
              <v-col
                sm="12"
                md="2"
                lg="4"
                xl="5"
              >
                <Card/>
              </v-col>
              <v-col
                sm="12"
                md="2"
                lg="4"
                xl="5"
              >
                <Card/>
              </v-col>
              <v-col
                sm="12"
                md="2"
                lg="4"
                xl="5"
              >
                <Card/>
              </v-col>
            </v-row>
        </v-container>
        <div class="text-center my-8">
          <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </div>
      </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/HomeCard.vue'
import { mdiMagnify, mdiClose } from '@mdi/js'

export default {
  name: 'Units',
  components: {
    NavBar,
    Footer,
    Card
  },
  data () {
    return {
      mdiMagnify,
      mdiClose,
      rules: {
        required : value => !!value || 'Required.',
        counter: [v => v.length <= 8 || 'Max 8 characters']
        },
      search: '',
      page : 1
    }
  },
  methods : {
    searchInfo () {
      console.log("Search", this.search)
      this.search = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

  .text-dark {
    color: color(typography, 4);
  }
</style>
