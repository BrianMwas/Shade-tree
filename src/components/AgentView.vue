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
</template>

<script>

import { mdiDelete } from "@mdi/js";
import { mapActions } from "vuex";

export default {
    props: ["loggedInUser", "companies"],
    name: "agent-view",
    data () {
        return {
            bin: mdiDelete,
        }
    },
    methods: {
      ...mapActions('agents', ['getAgents'])
    }
}
</script>