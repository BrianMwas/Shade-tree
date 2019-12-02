<template>
    <div>
      <NavBar/>
      <v-content app>
        <div class="container-fluid">
          <div class="s-start">
            <v-card class="s-start-rms mr-3" width="100" height="500">
              <v-img
              src="@/assets/brick-wall.jpg"
              height="100%"
              gradient="to top, rgba(0, 55, 0, 0.53), rgba(25,32,72,.2)">
              </v-img>
            </v-card>
            <div class="s-start-agent">
              <AgentCard/>
            </div>
          </div>
          
          <div class="s-info">
            <div class="price">
              <h3 class="price--title">ksh40000</h3>
            </div>
            <div class="stat">
              <div class="title">
                <h3 class="stat--title grey--text text--darken-2 font-weight-light">James Gichuru <span class="grey--text text--lighten-1 font-weight-bold">NRB</span></h3>
                <v-btn-toggle rounded>
                  <v-btn
                  >
                    <v-icon
                      color="red"
                    >{{ mapPin }}</v-icon>
                  </v-btn>
                  <v-btn
                    
                  >
                    <v-icon color="green">{{ share }}</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </div>
              <hr class="my-5">
              <div class="specs">
                <div class="spec--1">
                  <p class="grey--text text--darken-1 h5">Bedroom</p>
                  <h5 class="grey--text text--darken-3">4
                    <span>
                      <v-icon class="grey--text text--lighten-1">
                        {{ bed }}
                      </v-icon>
                    </span>
                  </h5>
                </div>
                <div class="spec--1">
                  <p class="grey--text text--darken-1 h5">Bathroom</p>
                  <h5 class="grey--text text--darken-3">2
                    <span>
                      <v-icon class="grey--text text--lighten-1">
                        {{ bathroom }}
                      </v-icon>
                    </span>
                  </h5>
                </div>
                <div class="spec--1">
                  <p class="grey--text text--darken-1 h5">Area</p>
                  <h5 class="grey--text text--darken-3">
                    1,024 ft<sup>2</sup>
                  </h5>
                </div>
                <div class="spec--1">
                  <p class="grey--text text--darken-1 h5">Built</p>
                  <h5 class="grey--text text--darken-3">
                    2018
                  </h5>
                </div>
                <div class="spec--1">
                  <p class="grey--text text--darken-1 h5">Parking</p>
                  <h5 class="grey--text text--darken-3">
                    1 Indoor
                  </h5>
                </div>
                <div class="spec--1">
                  <p class="grey--text text--darken-1 h5">Area Safety </p>
                  <h5 class="grey--text text--darken-3">
                    20%;
                  </h5>
                </div>
              </div>
              
            </div>
            <div class="analytics">
              <h3 class="grey--text font-weight-normal">Analytics</h3>
            </div>
          </div>

          <div class="s-end">
            <div></div>
            <div class="descr">
                <div class="title">
                  <h3 class="grey--text text--darken-2">Description</h3>
                </div>
                <div class="text">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo incidunt molestias fugiat deleniti porro 
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, ducimus at molestias fuga officiis soluta aspernatur officia unde maxime, nesciunt aut nostrum perspiciatis mollitia ratione, sapiente quibusdam labore quam minima.
                    deserunt numquam quae ipsa cum velit, nemo minus illum rem mollitia accusantium maiores ad quos vitae?</p>
                </div>
              </div>

          </div>
        </div>
      </v-content>
      <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import AgentCard from '@/components/AgentCard.vue'
import { mdiMapMarker, mdiBedSingleOutline, mdiToilet, mdiShareOutline } from '@mdi/js'

export default {
  name: 'SingleUnit',
  components: {
    NavBar,
    AgentCard,
    Footer
  },
  data () {
    return {
      mapPin: mdiMapMarker,
      share: mdiShareOutline,
      bed: mdiBedSingleOutline,
      bathroom: mdiToilet
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

  .container-fluid {
    width: 95%;
    margin: 0 auto;
    padding: 1em 0;
  }

  .green-bg {
    background-color: #2acc5a;
  }

  .green-txt {
    color: #2acc5a;
  }
  .text-dark {
    color: color(typography, 4);
  }

  // Uses a prefix of s to stand for single unit view.
  .s-start {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .s-start-rms {
      flex-grow: 1;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .s-info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    min-height: 60vh;
    margin: 20px auto;

    .price {
      height: 100%;
      flex-grow: 1;

      .price--title {
        color: limegreen;
      }
    }

    .stat {
      flex-grow: 3;
      height: 100%;
      display: block;
      
      
      .title {
        display: flex;
        justify-content: space-between;
        padding-right: 12em;
      }

      .specs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .spec--1 {
        width: 30%;
        height: 40%;
        margin: 15px 0;
      }

      .specs .spec--1 h5 {
        padding: 0;
        margin: 0;
      }
    }

    

    .stat .title .v-icon {
      margin: auto;
    }
    .analytics {
      height: 100%;
      flex-grow: 1;
    }
  }

  .s-end {
    width: 70%;
    margin: auto;

    .descr  {
        display: block;
        .text {
          width: 100%;
        }

        .text p {
          line-height: 1.7;
        }
      }
  }
  
</style>
