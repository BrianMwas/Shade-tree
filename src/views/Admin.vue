<template>
    <div>
        <!-- Routes only visible when user is logged in -->
         <NavBar  :loggedIn="loggedIn" :user="loggedInUser.username"  #loggedInRoutes>
          <v-btn text>
           <router-link to="/dashboard/userprofile" class="link">Profile</router-link>
         </v-btn>
         <v-btn text @click="logOutUser">
           Log Out
         </v-btn>
         <v-btn v-if="loggedInUserType == 'owner'" text>
           <router-link to="/newunit" class="link">Add Unit</router-link>
         </v-btn>
        </NavBar>
        <v-content dark app transition="fade-transition">
                <v-container>
                
                    <v-row transition="slide-y-reverse-transition">
                        <v-col cols="12" sm="12" md="4">
                            <v-card flat>
                            <v-card-title class="display-2 red--text" style="position: relative">
                                {{ totalUsers }}

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
                                {{ totalCompanies }}
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
                                {{ totalAgents }}
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
                        <v-col cols="12" sm="12" md="6" lg="4" xl="4">
                            <v-card class="mb-2">
                              <v-img
                                src="@/assets/galaxy.jpg"
                                :aspect-ratio="16/9"
                              >
                                  <v-row align="end" class="lightbox white--text pa-2 fill-height">
                                    <v-col>
                                        <small class="white--text mr-2">logged in as</small>
                                      <div class="heading white--text display-1">
                                        
                                      {{loggedInUser.username}}</div>
                                      <div class="body-1">{{loggedInUser.email}}</div>
                                    </v-col>
                                  </v-row>
                              </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-card>
                        <v-card-title>
                        Agents
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="searchAgent"
                            :append-icon="searchIcon"
                            label="Search agent"
                            single-line
                            hide-details
                        ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="agentHeaders"
                        :items="agentsArr"
                        :search="searchAgent"
                        ></v-data-table>
                    </v-card>
                    <v-card class="mt-5">
                        <v-card-title>
                        Companies
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="searchCompany"
                            :append-icon="searchIcon"
                            label="Search company"
                            single-line
                            hide-details
                        ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="companyHeaders"
                        :items="companiesArr"
                        :search="searchCompany"
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



import { mdiShieldLock, mdiFaceAgent, mdiNaturePeople, mdiOfficeBuilding, mdiClock, mdiMagnify } from '@mdi/js'
import { mapActions, mapState, createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth');


export default {
    name: 'Admin',
    components: {
        NavBar,
        Footer,
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
            searchAgent: '',
            searchCompany: '',
        agentHeaders: [
          {
            text: 'Agents',
            align: 'left',
            sortable: true,
            value: 'username',
          },
          { text: 'Rating', value: 'rating' },
          { text: 'Email', value: 'email' },
        ],
        companyHeaders: [
            {
                text: 'Companies',
                align: 'left',
                sortable: true,
                value: 'name'
            },
            {
                text: 'Completed',
                value: 'isCompleted'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Slug',
                value: 'slug'
            }
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
    },
    methods: {
        ...mapActions('admin', ['getNoOfUsers', 'getNoOfCompanies', 'getNoOfAgents', 'getNoOfEstates']),
        ...mapActions('agents', ['initAgents']),
        ...mapActions('auth', ['logOutUser']),

    },
    computed: {
        ...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
        ...mapState({
            totalAgents: state => state.admin.totalAgents,
            totalUsers: state => state.admin.totalUsers,
            totalCompanies: state =>  state.admin.totalCompanies,
            agentsArr : state => state.agents.agents,
            companiesArr: state => state.company.companies
        })

    },
    created() {
        this.initAgents(),
        this.getNoOfUsers(),
        this.getNoOfCompanies(),
        this.getNoOfAgents(),
        this.getNoOfEstates()
    }
}
</script>

<style lang="scss" scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .white {
        color: white;
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