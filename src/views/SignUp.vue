<template>
    <div>
      <NavBar/>
        <v-content app>
          <v-container>
            <div class="d-flex" justify="center" style="margin: 4.6em auto">
              <SignUpCard/>
            </div>
          </v-container>
        </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import SignUpCard from '@/components/SignUpCard.vue'

export default {
  name: 'SignUp',
  components: {
    NavBar,
    SignUpCard,
    Footer
  }
}
</script>

<style lang="scss" scoped>
</style>
