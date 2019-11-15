<template>
    <div>
      <NavBar/>
        <v-content>
          <v-container
            align-center
            align-content-center
            align-content-end
            align-content-space-around
          >
            <div>
              <h2 class="text-dark">Auth View</h2>
            </div>
          </v-container>
        </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Authentication',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="scss" scoped>
</style>
