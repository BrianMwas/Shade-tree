module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/global.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
          @import "@/scss/_layour.scss"
        `
      }
    }
  },
  plugins: {
    autoprefixer: {
      grid: true
    }
  }
}
