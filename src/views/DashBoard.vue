<template>
    <div >
      <!-- Routes only visible when user is logged in -->
        <NavBar  :loggedIn="loggedIn" :user="loggedInUser.username"  #loggedInRoutes>
         <v-btn v-if="loggedInUserType == 'admin'">
           <router-link to="/admin">Admin</router-link>
         </v-btn>
         <v-btn v-if="loggedInUserType == 'owner'" text>
           <router-link to="/newunit" class="link">Add Unit</router-link>
         </v-btn>
         <v-menu  transition="slide-y-transition" open-on-click>
            <template v-slot:activator="{ on }">
              <v-btn text dark v-on="on">
                {{ loggedInUser.username }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/dashboard/profile">
                Profile
              </v-list-item>
              <v-list-item @click="logOutUser">
                Log out
              </v-list-item>
            </v-list>
          </v-menu>
         
        </NavBar>
        <v-content dark transition="fade-transition" app class="h-100">
            <v-row>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      
                        <h4>{{agentUsername}}</h4>
                        <v-textarea
                          outlined
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
                <v-btn class="white" @click.native="message.stage = false">Close</v-btn>
              </v-snackbar>
              <div v-if="loggedInUserType == 'owner'">
                
                <owner-view 
                  :loggedInUser="loggedInUser"
                  :units="companyUnits"
                  :company="company"
                  :agents="agents"></owner-view>
                
              </div>
              <div v-else-if="loggedInUserType == 'user'">
                <regular-user :agentUsername="agentUsername" :dialog="dialog" :agents="agents" :loggedInUser="loggedInUser"></regular-user>
              </div>  
              <div v-else>
                <agent-view :loggedInUser="loggedInUser" :companies="companies"></agent-view>
              </div>            
              <!-- <h3 class="grey--text">{{ m }}</h3> -->
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>


import NavBar from '@/components/NavBar.vue';
import RegularUser from "@/components/RegularUser.vue";
import AgentView from "@/components/AgentView.vue";
import OwnerView from "@/components/OwnerView.vue"
import Footer from '@/components/Footer.vue';
import { mapState, mapGetters, mapActions, createNamespacedHelpers } from 'vuex';



import { mdiPencil, mdiArrowUp, mdiArrowDown, mdiMessage, mdiRefresh, mdiDelete, mdiCancel, mdiCamera } from '@mdi/js'
export default {
    name: 'Dashboard',
    components: {
        NavBar,
        OwnerView,
        AgentView,
        RegularUser,
        Footer
    },
    data () {
        return {
          m: "Hello",
            menuShow: false,
            dialog: false,
            bin: mdiDelete,
            up: mdiArrowUp,
            company: null,
            down: mdiArrowDown,
            messageIcon: mdiMessage,
            refreshIcon: mdiRefresh,
            clear: mdiCancel,
            camera: mdiCamera,
            showCompanyModule: false,
            agentUsername: "",
            companyUnits: null,
        }
    },
    methods: {
      ...mapActions('unit', ['init']),
      ...mapActions('alert', ['errorAlert']),
      ...mapActions('auth', ['logOutUser']),
      ...mapActions('agents', ['getAgents']),
      ...mapActions('profile', ['initProfile']),
      
      showCompanyProfileModule() {
        this.showCompanyModule = true
      },
      initCompany() {
        console.log("initCompany")
          this.company = this.companies.find(company => company.owner == this.loggedInUser._id)
      },
      companyUnitsSpec() {
        let units = this.companySpecificUnits(this.company._id);
        if(typeof units !== Array) {
            this.companyUnits = [units];
        } else {
          this.companyUnits = units;
        }
      },
      showMenu() {
        this.menuShow = true
      }
    },
    computed : {
      ...mapState({
        loggedIn: state => state.auth.status,
        Messages: state => state.alert.Messages.map(n => n.Raw),
        agentNames: states => state.agents.agents.map(agent => agent.username),
        agents: state => state.agents.agents,
        gettingAgents: state => state.agents.retrievingAgents,
        companies: state => state.company.companies,
        units: state => state.unit.units.results
      }),
      ...mapGetters('auth', ['loggedInUser', 'loggedInUserType', 'logged']),
      ...mapGetters('unit', ['companySpecificUnits'])
      
    },
    mounted() {
      this.$store.dispatch('agents/initAgents'),
      this.companyUnitsSpec()
    },
    created() {
      this.initCompany(),
      this.init(),
      this.$store.dispatch('profile/initProfile'),
      this.$store.dispatch('agents/initAgents'),

      this.$store.dispatch('admin/getNoOfUsers')
    }
    
}
</script>

<style lang="scss" scoped>

.h-100 {
    min-height: 75vh;
}
    .round {
      border-radius: 50%;
    }

    .agent-list {
      transition: all 200ms ease-in;
      &:hover {
        background: rgba(0, 0, 0, .15);
      }
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