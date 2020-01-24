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

<style  lang='scss'>
  @import '@/scss/global.scss';

  .v-application {
    font-family: 'PT sans', sans-serif;
  }
</style>
