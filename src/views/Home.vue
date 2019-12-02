<template>
   <div class="body-wrap">
        <!-- Head -->
        <header class="site-header">
            <v-container>
                <div class="site-header-inner">
                    <div class="brand header-brand">
                        <h1 class="m-0">
							<router-link to="/">
								<img class="header-logo-image" src="../assets/logo.png" alt="Logo">
                            </router-link>
                        </h1>
                    </div>
                </div>
            </v-container>
        </header>
        <!-- Main -->
        <main>
            <div>
                <section class="hero">
                    <div class="container">
                        <div class="hero-inner">
                        <div class="hero-copy">
                            <h1 class="hero-title mt-0 text-darkblue">Welcome to Shade tree</h1>
                            <p class="hero-paragraph text-darkgrey">Finding the right home to move to can be really daunting and that's why we are here to help you find one at your convinience..</p>
                            <div class="hero-cta"><router-link class="button button-primary" to="/units">browse</router-link><router-link class="button" to="/units">Get in touch</router-link></div>
                        </div>
                        </div>
                    </div>
                </section>

                <section class="features section">
                    <v-container class="container">
                        <div class="features-inner section-inner">
                            <div class="features-wrap">
                                <div class="feature text-center is-revealing">
                                    <div class="feature-inner">
                                        <div class="feature-icon">
                                            <img src="../assets/512/Shield.png" alt="Security">
                                        </div>
                                        <h4 class="feature-title mt-24 text-darkblue">Secure</h4>
                                        <p class="text-sm mb-0 text-darkgrey">You won't have to go through middlemen for you to get information. All agents are supervised by the owners themselves</p>
                                    </div>
                                </div>
                                <div class="feature text-center is-revealing">
                                    <div class="feature-inner">
                                        <div class="feature-icon">
                                            <img src="../assets/512/Phone.png" alt="Agents">
                                        </div>
                                        <h4 class="feature-title mt-24 text-darkblue">Agents</h4>
                                        <p class="text-sm mb-0 text-darkgrey">We have dedicated agents all who have to pass through assessment and supervised to provide true information.</p>
                                    </div>
                                </div>
                                <div class="feature text-center is-revealing">
                                    <div class="feature-inner">
                                        <div class="feature-icon">
                                            <img src="../assets/512/Laptop.png" alt="Feature 03">
                                        </div>
                                        <h4 class="feature-title mt-24 text-darkblue">Convenience</h4>
                                        <p class="text-sm mb-0 text-darkgrey">You don't have to move to the site to get a feel of your dream home. We use high quality photos of every section of the unit for you to view and judge.</p>
                                    </div>
                                </div>
                                <div class="feature text-center is-revealing">
                                    <div class="feature-inner">
                                        <div class="feature-icon">
                                            <img src="../assets/512/Rocket.png" alt="Fast Site">
                                        </div>
                                        <h4 class="feature-title mt-24 text-darkblue">Seamless</h4>
                                        <p class="text-sm mb-0 text-darkgrey">You have a wide variety to choose from based on bathrooms, number of rooms, price, term of payment. You get to choose what fits you</p>
                                    </div>
                                </div>
                                <div class="feature text-center is-revealing">
                                    <div class="feature-inner">
                                        <div class="feature-icon">
                                                <img src="../assets/512/Shopping Bag.png" alt="Products">
                                        </div>
                                        <h4 class="feature-title mt-24 text-darkblue">Shop Shop</h4>
                                        <p class="text-sm mb-0 text-darkgrey">We not only have homes we also have green flowers and other house accessories to beautify your home.</p>
                                    </div>
                                </div>
                                <div class="feature text-center is-revealing">
                                    <div class="feature-inner">
                                        <div class="feature-icon">
                                            <img src="../assets/512/Location Pin.png" alt="Map">
                                        </div>
                                        <h4 class="feature-title mt-24 text-darkblue">Maps</h4>
                                        <p class="text-sm mb-0 text-darkgrey">You also have the luxury of viewing all available homes around you so you won't use alot to move to a new place.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-container>
                </section>

                <section class="section primary">
                    <div class="container mb-4">
                        <h2 class="text-center">Our Count.</h2>
                        <v-row
                            justify="center"
                            class="my-3"
                        >
                            <v-col 
                                class="m-3"
                                sm="12"
                                md="2"
                                lg="3"
                                >
                                <h1 class="display-3 white--text text-center count">
                                    200
                                </h1>
                                <v-divider class="white mx-a" width="150"></v-divider>
                                <h5 class="text-center white--text">Agents</h5>
                            </v-col>
                            <v-col 
                                class=" m-3"
                                m-2
                                sm="12"
                                md="2"
                                lg="3"
                                >
                                <h1 class="display-3 white--text text-center count">
                                    450
                                </h1>
                                <v-divider class="white mx-a" width="150"></v-divider>
                                <h5 class="text-center white--text">Units</h5>
                            </v-col>
                            <v-col 
                                class="m-3"
                                m-2
                                sm="12"
                                md="2"
                                lg="3"
                                >
                                <h1 class="display-3 white--text text-center count">
                                    20
                                </h1>
                                <v-divider class="white mx-a" width="150"></v-divider>
                                <h5 class="text-center white--text">Product Types</h5>
                            </v-col>
                        </v-row>
                    </div>         
                </section>
                <section class="card section">
                    <div class="container-sm">
                        <div class="card-inner section-inner">
                        <div class="card-header text-center">
                            <h2 class="section-title mt-0 text-darkblue">Home features</h2>
                            <p class="section-paragraph mb-0 text-darkgrey">All units have the following properties for better information for choosing.</p>
                        </div>
                        <div class="card-tables-wrap">
                            <div class="card-table">
                                <div class="card-table-inner is-revealing">
                                    <div class="card-table-main">
                                    <div class="card-table-features-title pt-24 pb-24 text-center">What you will get</div>
                                    <ul class="card-table-features list-reset text-xs">
                                        <li>
                                            <span>Location</span>
                                        </li>
                                        <li>
                                            <span>Safety</span>
                                        </li>
                                        <li>
                                            <span>Number of rooms</span>
                                        </li>
                                        <li>
                                            <span>Number of bathrooms</span>
                                        </li>
                                        <li>
                                            <span>Price</span>
                                        </li>
                                        <li>
                                            <span>Method of payment</span>
                                        </li>
                                    </ul>
                                    </div>
                                    <div class="card-table-cta mb-8">
                                        <a class="button button-primary button-shadow button-block" href="#">Browse</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

                <section class="cta section">
                <div class="container">
                    <div class="cta-inner section-inner">
                    <h3 class="section-title mt-0">Still not convinced?</h3>
                    <div class="cta-cta">
                        <a class="button button-primary button-wide-mobile" href="#">Talk to Us.</a>
                    </div>
                    </div>
                </div>
                </section>
            </div>   
        </main>
          <!-- Footer -->
        <Footer />
    </div>

</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
export default {
  name: 'home',
  components: {
    Footer
  }
}

</script>

<style lang='scss'>
  @import '@/scss/global.scss';
    .text-darkblue {
        color: color(primary, 1)
    }

    .text-darkgrey {
        color: color(typography, 4);
    }

    .count {
        margin: 16px !important;
    }
</style>
