<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang='scss'>
  @import '@/scss/global.scss';

  #app {
    h1, p, h2, h3 {
      font-family: 'Open sans', sans-serif !important;
    }
  }

  body {
    background: color(typography, 1);
  }
  .v-application {
    font-family: 'PT sans', sans-serif;
  }
</style>
