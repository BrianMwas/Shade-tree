<template>
    <div>
      <!-- Routes only visible when user is logged in -->
        <NavBar  :loggedIn="loggedIn" :user="loggedInUser.username"  #loggedInRoutes>
          <v-btn text v-if="loggedInUserType !== 'admin'">
           <router-link to="/dashboard/userprofile" class="link">Profile</router-link>
         </v-btn>
         <v-btn v-if="loggedInUserType == 'admin'">
           <router-link to="/admin">Admin</router-link>
         </v-btn>
         <v-btn text @click="logOutUser">
           Log Out
         </v-btn>
         <v-btn v-if="loggedInUserType == 'owner'" text>
           <router-link to="/newunit" class="link">Add Unit</router-link>
         </v-btn>
        </NavBar>
        <v-content dark transition="fade-transition" app>
            <v-row>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      
                        <v-select
                          :items="agents.map(agent => agent.username)"
                          label="Agent*"
                          required
                          filled
                          color="green darken-3"
                        ></v-select>
                        <v-textarea
                          filled
                          name="description"
                          cleareable
                          :clear-icon="clear"
                          rows="4"
                          row-height="20" 
                          color="green darken-3"
                          label="Message"
                          type="text"
                      >
                      </v-textarea>
                    
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" text @click="dialog = false">Send</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-row>
            <v-container>
                
              <v-snackbar
                v-for="message in Messages"
                :key="message.mKey"
                v-model="message.stage"
                :color="message.type"
                top
                class="mt-5"
              >
                {{message.message}}
                <v-btn flat color="success" @click.native="message.stage = false">Close</v-btn>
              </v-snackbar>
              <div v-if="loggedInUserType == 'owner'">
                <v-card>
                  <v-img
                    height="150"
                    aspect-ratio="16/9"
                    src="@/assets/ginger-pot.jpg"
                    gradient="to top, rgba(0, 0, 0, 87), rgba(0, 0, 0, .25)"
                    class="white--text align-start"
                  >
                    <v-row align="end" class="lightbox white--text pa-2 fill-height">
                      <v-col>
                        <div class="heading white--text display-1">{{loggedInUser.username}}</div>
                        <div class="body-1">{{loggedInUser.email}}</div>
                      </v-col>
                    </v-row>
                  </v-img>
                 

                  <v-card-actions>
                    <v-btn color="green" depressed class="white--text" to="newunit">ADD Unit</v-btn>
                    <v-btn color="primary" v-if="company" text>EDIT Company</v-btn>
                    <v-btn v-else color="red darken-1">Add Company</v-btn>
                  </v-card-actions>
                </v-card>
                <v-row>
                  <v-col cols="12" lg="6" md="6" sm="12">
                    <v-card>
                      <v-toolbar color="primary">
                        <v-toolbar-title class="white--text">Agents</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <div v-if="company.agents.length <= 0">
                          <p class="text-center">You don't have any agents yet</p>
                        </div>
                        <div v-else>
                          <p>You have a couple of agents</p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" lg="6" md="6" sm="12">
                    <v-card>
                      <v-toolbar color="green darken-3">
                        <v-toolbar-title class="white--text">Company Details</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <v-list two-line>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ company.name }}</v-list-item-title>
                              <v-list-item-subtitle>{{company.description}}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ company.email }}</v-list-item-title>
                              <v-list-item-subtitle>{{company.website}}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ company.internationalFormat }}</v-list-item-title>
                              <v-list-item-subtitle>{{company.nationalFormat}}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="8" md="6" sm="12">
                    <v-card>
                      <v-toolbar color="red">
                        <v-toolbar-title class="white--text">Units</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <v-list two-line>
                          <v-list-item v-for="unit in units" :key="unit._id">
                            <v-list-item-content>
                              <v-list-item-title>{{ unit.name }}</v-list-item-title>
                              <v-list-item-subtitle><span class="font-weight-bold mr-3">{{ unit.priceAnnual }}</span> <span>{{unit.category}}</span></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" lg="4" md="6" sm="12">
                    <v-card>
                      <v-toolbar color="purple">
                        <v-toolbar-title class="white--text">Messages</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <p>Where your company messages will be</p>
                        <v-btn color="primary" @click="showCompany">Company</v-btn>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-else-if="loggedInUserType == 'user'">
                <v-row>
                  <v-col
                    cols="12"
                    xs="12"
                    md="7"
                    lg="8"
                  >
                  
                    <v-card class="mb-2">
                      <v-img
                        src="@/assets/galaxy.jpg"
                        :aspect-ratio="16/9"
                      >
                        <!-- <div class="p-5">
                            <h2 class="white--text dispaly-1">{{loggedInUser.username}}</h2>
                            <h5 class="white--text font-weight-light display-5">{{loggedInUser.email}}</h5>
                        </div> -->
                          <v-row align="end" class="lightbox white--text pa-2 fill-height">
                            <v-col>
                              <div class="heading white--text display-1">{{loggedInUser.username}}</div>
                              <div class="body-1">{{loggedInUser.email}}</div>
                            </v-col>
                          </v-row>
                      </v-img>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    xs="12"
                    md="5"
                    lg="4">
                      <v-card class="mb-2">
                      <v-toolbar color="purple">
                        <v-toolbar-title class="white--text">
                          Saved Units
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon ripple @click="getAgents">
                          <v-icon color="white">{{ bin }}</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p>This is my saved units box</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="7"
                    lg="7"
                  >
                    <v-card>
                      <v-toolbar color="cyan">
                        <v-toolbar-title class="white--text">
                          Map
                        </v-toolbar-title>
                        <!-- <v-spacer></v-spacer>
                        <v-btn icon ripple @click="getAgents">
                          <v-icon color="white">{{ bin }}</v-icon>
                        </v-btn> -->
                      </v-toolbar>
                      <v-card-text>
                        <p>This is your map view</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="5"
                    lg="5"
                  >
                    <v-card class="mb-2">
                      <v-toolbar color="green darken-1">
                        <v-toolbar-title class="white--text">
                          Agents
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon ripple @click="getAgents">
                          <v-icon color="white">{{ refreshIcon }}</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                      
                        
                        <div v-if="agents.length > 0">
                          <v-list two-line>
                             <v-list-item
                              v-for="agent in agents"
                              :key="agent.id"
                             >
                              <v-list-item-avatar>
                                <v-img src="@/assets/face.jpg"></v-img>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title v-text="agent.username"></v-list-item-title>
                                <v-list-item-subtitle v-text="agent.email"></v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-icon>
                                <!-- <v-btn @click="sendMessage"  color="success"> -->
                                  <v-icon @click="sendMessage(agent._id)" color="primary">{{ messageIcon }}</v-icon>
                                <!-- </v-btn> -->
                              </v-list-item-icon>
                             </v-list-item>
                          </v-list>
                          
                        </div>
                        <div v-else>
                          <div class="d-flex justify-center align-center">
                            <p>Sorry we could not find any agents</p>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>  
              <div v-else>
                <v-row>
                  <v-col
                    cols="12"
                    xs="12"
                    md="7"
                    lg="8"
                  >
                  
                    <v-card class="mb-2">
                      <v-img
                        src="@/assets/galaxy.jpg"
                        :aspect-ratio="16/9"
                      >
                        <!-- <div class="p-5">
                            <h2 class="white--text dispaly-1">{{loggedInUser.username}}</h2>
                            <h5 class="white--text font-weight-light display-5">{{loggedInUser.email}}</h5>
                        </div> -->
                          <v-row align="end" class="lightbox white--text pa-2 fill-height">
                            <v-col>
                              <div class="heading white--text display-1">{{loggedInUser.username}}</div>
                              <div class="body-1">{{loggedInUser.email}}</div>
                            </v-col>
                          </v-row>
                      </v-img>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="12"
                    xs="12"
                    md="5"
                    lg="4">
                      <v-card class="mb-2">
                      <v-toolbar color="purple">
                        <v-toolbar-title class="white--text">
                          Saved Companies
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon ripple @click="getAgents">
                          <v-icon color="white">{{ bin }}</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p>This is my prospecting companies box</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  
                </v-row>
                <v-row>
                  <v-col 
                    cols="12"
                    xs="12"
                    md="6"
                    lg="6"
                  >
                    <v-card>
                      <v-toolbar color="primary">
                        <v-toolbar-title class="white--text">Companies</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <p>This inlcudes the companies I can request..</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col 
                    cols="12"
                    xs="12"
                    md="6"
                    lg="6"
                  >
                    <v-card>
                      <v-toolbar color="secondary">
                        <v-toolbar-title class="white--text">Clients</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <p>This inlcudes the messages from clients.</p>
                      </v-card-text>
                    </v-card>
                  
                  </v-col>
                </v-row>
              </div>            
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>


import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

import { mdiPencil, mdiArrowUp, mdiArrowDown, mdiMessage, mdiRefresh, mdiDelete, mdiCancel, mdiCamera } from '@mdi/js'
export default {
    name: 'Dashboard',
    components: {
        NavBar,
        Footer
    },
    data () {
        return {
            dialog: false,
            bin: mdiDelete,
            up: mdiArrowUp,
            down: mdiArrowDown,
            messageIcon: mdiMessage,
            refreshIcon: mdiRefresh,
            clear: mdiCancel,
            camera: mdiCamera,
            showCompanyModule: false
        }
    },
    methods: {
      ...mapActions('alert', ['errorAlert']),
      ...mapActions('auth', ['logOutUser']),
      ...mapActions('agents', ['getAgents']),
      ...mapActions('profile', ['initProfile']),
      sendMessage(id) {
        this.dialog = true
        console.log("Your profile", this.agents.find(agent =>agent.id == id).email)
      },
      showCompanyProfileModule() {
        this.showCompanyModule = true
      },
      showCompany() {
        return this.companies.find(company => company.owner == this.loggedInUser._id )
      },
      showStartM() {
        console.log("start", this.startMessages)
      },
      showStageM() {
        console.log("stage", this.stageMessages)
      }
    },
    computed : {
      ...mapState({
        loggedIn: state => state.auth.status,
        Messages: state => state.alert.Messages.map(n => n.Raw),
        agents: state => state.agents.agents,
        gettingAgents: state => state.agents.retrievingAgents,
        companies: state => state.company.companies,
        units: state => state.unit.units
      }),
      ...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
      paramer () {
          return this.$route.params.username
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      company: {
        get() {
          return this.companies.find(company => company.owner == this.loggedInUser._id)
        }
      },
      startMessages () {
        return this.Messages.find(messages => messages.stage == "start")
      },
      stageMessages () { 
        return this.Messages.find(messages => messages.stage == "within")
      }
    },
    mounted() {
      this.$store.dispatch('agents/initAgents')
    },
      
    created() {
      this.$store.dispatch('profile/initProfile'),
      this.$store.dispatch('admin/getNoOfUsers')
    }
}
</script>

<style lang="scss" scoped>
    .round {
      border-radius: 50%;
    }

    .fd-column {
      display: flex;
      flex-direction: column;
    }

    .btn {
        background-color: #3a3a3a;
        color: white;
        padding: 1em .75em;
        width: 20%;
        box-shadow: 0 10px 35px currentColor;

        &:hover {
            background-color: dimgray;
        }
    }

    .mx-2e {
      margin: 2em auto;
    }

    .site {
      display: block;
      margin: auto;
    }

    .profile {
      position: relative;
      border-radius: 50% !important;
      top: -100px;
      left: 20px;
    }
</style>