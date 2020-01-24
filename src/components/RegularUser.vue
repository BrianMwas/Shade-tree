<template>
    <div>
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
</template>

<script>
import { mapActions } from "vuex";
import { mdiMessage } from "@mdi/js"
export default {
    props: ["loggedInUser", "agents", "dialog", "agentUsername"],
    name: "regular-user",
    methods: {
        ...mapActions('agents', ['getAgents']),
        sendMessage(id) {
            this.dialog = true
            this.agentUsername = getAgents.find(a => a.id == id).map(u => u.username);
            console.log("Your profile", this.agents.find(agent =>agent.id == id).email)
        },
    }
}
</script>