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
           <router-link to="/logout" class="link">Add Unit</router-link>
         </v-btn>
        </NavBar>
        <v-content dark transition="fade-transition" app>
            <v-container>
              <div v-if="Messages.length > 0">
                <v-alert 
                  class="my-5 mx-3" 
                  border="left" 
                  close-label="Close alert" 
                  :type="message.type" 
                  dismissible
                  v-for="message in Messages"
                  :key="message.message"
                >
                  {{message.message}}
                </v-alert>
              </div>      
              <div v-if="loggedInUserType == 'owner'">
                <v-card class="mx-2e">
                  <v-img
                    height="150"
                    aspect-ratio="16/9"
                    src="@/assets/ginger-pot.jpg"
                    gradient="to top, rgba(0, 0, 0, 87), rgba(0, 0, 0, .25)"
                    class="white--text align-start"
                  >
                  </v-img>
                 
                  <v-card-title primary-title>
                    Kijani Hills Apartments
                  </v-card-title>
                  <v-card-subtitle>
                    Signed in as <strong>{{ loggedInUser.username }}</strong>
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn color="green" depressed class="white--text">ADD Unit</v-btn>
                    <v-btn color="primary" text>EDIT Company</v-btn>
                  </v-card-actions>
                </v-card>
                <v-row v-if="loggedInUserType == 'agent'">
                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <h2 class="grey--text text--darken-2 mb-3">Agents</h2>
                    <v-simple-table fixed-header height="300" width="400">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Sale</th>
                            <th class="text-left">Rating</th>
                            <th class="text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="agent in agents" :key="agent.name">
                            <td>{{agent.name}}</td>
                            <td>{{agent.sale}}</td>
                            <td>{{agent.rating}}</td>
                            <td>
                              <v-btn color="red" icon>
                                <v-icon color="danger">{{bin}}</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="site">
                    <v-card
                      class="mx-auto"
                      color="green"
                      dark
                      max-width="400"
                    >
                      <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                          <v-sparkline
                            :labels="labels"
                            :value="value"
                            color="rgba(255, 255, 255, .7)"
                            height="100"
                            padding="24"
                            stroke-linecap="round"
                            smooth
                            line-width="2"
                          >
                          </v-sparkline>
                        </v-sheet>
                      </v-card-text>
                      <v-card-text>
                        <div class="display-1 font-weight-thin">Overall site visits</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  sort-by="calories"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>My Units</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                          <v-btn color="success" depressed dark class="mb-2" v-on="on">New Unit</v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      color="green"
                      @click="editItem(item)"
                    >
                      {{edit}}
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(item)"
                      color="red"
                    >
                      {{bin}}
                    </v-icon>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                  </template>
                </v-data-table>
              </div>
              <div v-if="loggedInUserType == 'user'">
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
              { text: 'Actions', value: 'action', sortable: false },
            ],
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            value: [
              423,
              446,
              675,
              510,
              590,
              610,
              760,
              678,
              456,
              567,
              780,
              400
            ],
            agents2: [
              {
                name: "Brian",
                sale: 12,
                rating: 4.1
              },
              {
                name: "Brandon",
                sale: 12,
                rating: 4.1
              },
              {
                name: "Esther",
                sale: 12,
                rating: 4.1
              },
              {
                name: "Morgan",
                sale: 12,
                rating: 4.1
              },
              {
                name: "Newton",
                sale: 12,
                rating: 4.1
              }
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
              name: '',
              calories: 0,
              fat: 0,
              carbs: 0,
              protein: 0,
            },
            defaultItem: {
              name: '',
              calories: 0,
              fat: 0,
              carbs: 0,
              protein: 0,
            },
           
        }
    },
   
    watch : {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      ...mapActions('alert', ['errorAlert']),
      ...mapActions('auth', ['logOutUser']),
      ...mapActions('agents', ['getAgents']),
      ...mapActions('profile', ['initProfile']),
      sendMessage(id) {
        console.log("Your profile", this.agents.find(agent =>agent.id == id).email)
      },
        initialize () {
          this.desserts = [
            {
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
            },
            {
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
            },
            {
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
            },
            {
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
            },
            {
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
            },
            {
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
            },
            {
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
            }
          ]
        },
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },

        deleteItem (item) {
          const index = this.desserts.indexOf(item)
          confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.push(this.editedItem)
          }
          this.close()
        }
    },
    computed : {
      ...mapState({
        loggedIn: state => state.auth.status,
        Messages: state => state.alert.Messages.map(n => n.Raw),
        agents: state => state.agents.agents,
        gettingAgents: state => state.agents.retrievingAgents
      }),
      ...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
      paramer () {
          return this.$route.params.username
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    mounted() {
      this.$store.dispatch('agents/initAgents')
    },
      // async beforeCreate() {
      //   await this.$store.dispatch('profile/initProfile')    
      // },
    created() {
      this.$store.dispatch('profile/initProfile')    
      // this.userProfile = this.$cookies.get('userProfile');
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