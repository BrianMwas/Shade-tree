<template>
    <div>
      <NavBar/>
      <v-content app>
        <v-container
          style="1000px"
          >
            <v-row justify-space-around>
              <Card/>
            </v-row>
        </v-container>
      </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/HomeCard.vue'

export default {
  name: 'SingleUnit',
  components: {
    NavBar,
    Footer,
    Card
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

  .text-dark {
    color: color(typography, 4);
  }
</style>
