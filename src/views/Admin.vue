<template>
    <div>
        <!-- Routes only visible when user is logged in -->
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
                <v-container>
                    <v-row transition="slide-y-reverse-transition">
                        <v-col cols="12" sm="12" md="4">
                            <v-card flat>
                            <v-card-title class="display-2 red--text" style="position: relative">
                                230

                                <div class="icon-card--users">
                                    <v-icon large color="white">{{ user }}</v-icon>
                                </div>
                            </v-card-title>
                            <v-card-text class="font-weight-bold">Users</v-card-text>
                        </v-card>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-card flat class="mb-3">
                            <v-card-title class="display-2 green--text" style="position: relative">
                                20
                                <div class="icon-card--company">
                                    <v-icon large color="white">{{ company }}</v-icon>
                                </div>
                            </v-card-title>
                            <v-card-text class="font-weight-bold">Companies</v-card-text>
                        </v-card>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                            <v-card flat mb-4>
                            <v-card-title class="display-2 blue--text" style="position: relative">
                                100
                                <div class="icon-card--agents">
                                    <v-icon large class="m-a" color="white">{{ agents }}</v-icon>
                                </div>
                            </v-card-title>
                            <v-card-text class="font-weight-bold">Agents</v-card-text>
                        </v-card>
                        </v-col>  
                    </v-row>
                    <v-row class="my-4">
                        <v-col cols="12" sm="12" md="6" lg="4" xl="4">
                            <v-card min-width="300" max-width="400"
                                class="mt-4 mx-auto"
                            >
                                <v-sheet
                                    color="cyan"
                                    class="v-sheet--offset mx-auto"
                                    elevation="12"
                                    max-width="calc(100% - 32px)"
                                >
                                    <v-sparkline :labels="labels" :value="value" stroke-linecap="round" smooth color="white" line-width="2" padding="16"></v-sparkline>
                                </v-sheet>
                                <v-card-text class="pt-0">
                                    <div class="title font-weight-light mb-2">
                                        Agent registrations
                                    </div>
                                    <div class="subheading font-weight-light grey--text">
                                        Last Campaign performance
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <v-icon class="mr-2" small>{{clock}}</v-icon>
                                    <span class="caption grey--text font-weight-light">Last registration 24 min ago</span>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="4" xl="4">
                            <!-- <v-card min-width="300" max-width="400">
                                <v-card-title primary-title>
                                    User visits Weekly
                                </v-card-title>
                                <v-card-text>
                                    <chartist ratio="ct-major-second" type="Line" :data="chartData" :options="ChartOptions"></chartist>
                                </v-card-text>
                            </v-card> -->
                            <v-card min-width="300" max-width="400"
                                class="mt-4 mx-auto"
                            >
                                <v-sheet
                                    color="orange lighten-1"
                                    class="v-sheet--offset mx-auto"
                                    elevation="12"
                                    max-width="calc(100% - 32px)"
                                >
                                    <v-sparkline :labels="labels" :value="value" stroke-linecap="round" smooth color="white" line-width="2" padding="16"></v-sparkline>
                                </v-sheet>
                                <v-card-text class="pt-0">
                                    <div class="title font-weight-light mb-2">
                                        Company registrations
                                    </div>
                                    <div class="subheading font-weight-light grey--text">
                                        Last Campaign performance
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <v-icon class="mr-2" small>{{clock}}</v-icon>
                                    <span class="caption grey--text font-weight-light">Last registration 24 min ago</span>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="4" xl="4">
                            <!-- <v-card min-width="300" max-width="400">
                                <v-card-title primary-title>
                                    User visits Weekly
                                </v-card-title>
                                <v-card-text>
                                    <chartist ratio="ct-major-second" type="Line" :data="chartData" :options="ChartOptions"></chartist>
                                </v-card-text>
                            </v-card> -->
                            <v-card min-width="300" max-width="400"
                                class="mt-4 mx-auto"
                            >
                                <v-sheet
                                    color="green lighten-1"
                                    class="v-sheet--offset mx-auto"
                                    elevation="12"
                                    max-width="calc(100% - 32px)"
                                >
                                    <v-sparkline :labels="labels" :value="value" stroke-linecap="round" smooth color="white" line-width="2" padding="16"></v-sparkline>
                                </v-sheet>
                                <v-card-text class="pt-0">
                                    <div class="title font-weight-light mb-2">
                                        User registrations
                                    </div>
                                    <div class="subheading font-weight-light grey--text">
                                        Last Campaign performance
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <v-icon class="mr-2" small>{{clock}}</v-icon>
                                    <span class="caption grey--text font-weight-light">Last registration 24 min ago</span>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-card>
                                <v-card-title>
                                Nutrition
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    :append-icon="searchIcon"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                :headers="headers"
                                :items="desserts"
                                :search="search"
                                ></v-data-table>
                            </v-card>
                </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import VueChartist from 'vue-chartist'

import { mdiShieldLock, mdiFaceAgent, mdiNaturePeople, mdiOfficeBuilding, mdiClock, mdiMagnify } from '@mdi/js'

export default {
    name: 'Admin',
    components: {
        NavBar,
        Footer,
        'vue-chartist': VueChartist
    },
    data () {
        return {
            mdiShieldLock,
            loggedIn: false,
            agents: mdiFaceAgent,
            user: mdiNaturePeople,
            company: mdiOfficeBuilding,
            clock: mdiClock,
            searchIcon: mdiMagnify,
            search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
            labels: [
                '12am',
                '3am',
                '6am',
                '9am',
                '12pm',
                '3pm',
                '6pm',
                '9pm'
            ],
            value: [
                200,
                675,
                410,
                390,
                310,
                460,
                250,
                240
            ],
            chartData: {
                labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday'
                ],
                series: [
                    [12, 3, 7, 8, 5],
                    [9, 7, 8, 6, 5],
                    [1, 3, 4, 5, 6]
                ],
            },
            
            ChartOptions: {
                fullWidth: true,
                lineSmooth: false,
                chartPadding: {
                    right: 40
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .icon-card--agents {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 70px;
        width: 70px;
        border-radius: 5px;
        border: none;
        outline: none;
        top: -10px;
        right: -10px;
        box-shadow: 0 10px 15px rgba(6, 85, 231, 0.25);
        background: linear-gradient(to top right, rgb(0, 98, 255) 0%, rgb(95, 170, 255) 100%)
    }
    .icon-card--users {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 70px;
        width: 70px;
        border-radius: 5px;
        border: none;
        outline: none;
        top: -10px;
        right: -10px;
        box-shadow: 0 10px 15px rgba(231, 6, 6, 0.25);
        background: linear-gradient(to top right, rgb(231, 19, 19), rgb(250, 99, 99))
    }

    .icon-card--company {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 70px;
        width: 70px;
        border-radius: 5px;
        border: none;
        outline: none;
        top: -10px;
        right: -10px;
        box-shadow: 0 10px 15px rgba(53, 243, 110, 0.25);
        background: linear-gradient(to top right, rgb(7, 156, 39), rgb(50, 241, 66))
    }
</style>