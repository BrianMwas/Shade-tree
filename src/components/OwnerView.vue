<template>
    <div >
        <v-snackbar
            v-for="message in Messages"
            :key="message.mKey"
            v-model="message.stage"
            :color="message.type"
            top
            class="mt-5"
            >
            {{message.message}}
            <v-btn class="white--text" text @click.native="message.stage = false">Close</v-btn>
            </v-snackbar>
                <v-tabs v-model="tab" right>
                  <v-tab>
                    Home
                  </v-tab>
                  <v-tab>
                    Manage Units
                  </v-tab>
                  <v-tab>
                    Company profile
                  </v-tab>
                </v-tabs>
                <v-tabs-items class="mt-3" v-model="tab">
                    <v-tab-item
                    >
                     <div>
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
                                <v-btn 
                                color="green" 
                                depressed 
                                class="white--text" 
                                to="/newunit">ADD Unit</v-btn>
                              </v-card-actions>
                        </v-card>
                        <v-row>
                        <!-- Company agents -->
                        <v-col cols="12" lg="4" md="6" sm="12">
                            <v-card>
                            <v-toolbar color="primary">
                                <v-toolbar-title class="white--text">Agents</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <div v-if="company.agents.length <= 0">
                                  <p class="text-center">
                                    You don't have any agents yet
                                  </p>
                                </div>
                                <div v-else>
                                    <v-list two-line >
                                        <v-list-item class="agent-list" v-for="agent in companyAgents" :key="agent._id">
                                            <v-list-item-icon @click="removeAgent(company.slug, agent._id)">
                                                <v-icon color="red darken-2">{{ mdiDeleteCircle }}</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ agent.username }}</v-list-item-title>
                                                <v-list-item-subtitle><span class="font-weight-bold mr-3">{{ agent.email }}</span></v-list-item-subtitle>
                                            </v-list-item-content>
                                             <v-list-item-icon>
                                                <v-icon color="green darken-2">{{ mdiMessage }}</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                            </v-card>
                        </v-col>
                        <!-- Where all agents prospecting will be at -->
                        <v-col cols="12" lg="4" md="6" sm="12">
                            <v-card>
                            <v-toolbar color="purple">
                                <v-toolbar-title class="white--text">All Agents</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-list two-line v-if="agents">
                                <v-list-item class="agent-list" v-for="agent in agents" :key="agent._id">
                                    <v-list-item-icon @click="addSingleAgent(agent._id)">
                                        <v-icon color="blue darken-2">{{ mdiPlusCircle }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ agent.username }}</v-list-item-title>
                                        <v-list-item-subtitle><span class="font-weight-bold mr-3">{{ agent.email }}</span></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-icon>
                                        <v-icon color="green darken-2">{{ mdiMessage }}</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                                </v-list>
                                <div class="text-center" v-else>
                                    <p>No agents yet</p>
                                </div>
                            </v-card-text>
                            </v-card>
                        </v-col>
                        <!-- Company details -->
                        <v-col cols="12" lg="4" md="6" sm="12">
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
                                <v-divider class="grey lighten-3"></v-divider>
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
                            <v-card-text >
                                <v-list two-line v-if="units.length > 0">
                                <v-list-item v-for="unit in units" :key="unit._id">
                                    <v-list-item-content>
                                    <v-list-item-title>{{ unit.name }}</v-list-item-title>
                                    <v-list-item-subtitle><span class="font-weight-bold mr-3">{{ unit.priceAnnual }}</span> <span>{{unit.category}}</span></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                </v-list>
                                <div class="text-center" v-else>
                                    <p>Sorry you don't have any units yet</p>
                                    <v-btn 
                                        to="/newunit" 
                                        block 
                                        color="red" 
                                        
                                        class="white--text"
                                    >Add unit</v-btn>
                                </div>
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
                    </v-tab-item>
                    <v-tab-item>
                        
                        <v-row v-if="units.length > 0">
                            <v-col 
                            cols="12"
                             md="6" 
                             lg="4"
                             v-for="unit in units"
                            :key="unit._id"
                             >
                                <edit-unit :updateUnit="unit"></edit-unit>
                             </v-col>
                        </v-row>
        
                        
                        <v-card v-else>
                            <v-card-text class="text-center">
                                <p class="black--text">
                                    You need to add units first before you can edit
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-card-title>
                                Edit Company
                            </v-card-title>
                          <v-card-text>
                              <p class="grey--text text--darken-3">Lets update our company</p>
                          </v-card-text>  
                        </v-card>
                        
                    </v-tab-item>
                </v-tabs-items>
    </div>
</template>

<script>

import { mapActions, mapState } from "vuex";
import { mdiPlusCircle, mdiMessage, mdiDeleteCircle, mdiCancel  } from "@mdi/js";
import { validationMixin } from "vuelidate"
const { minLength, maxLength, required, between, numeric } = require("vuelidate/lib/validators")
import EditUnit from "./EditUnit"


export default {
    props: ["units", "loggedInUser", "company", "agents"],
    name: "owner-view",
    components: {
        EditUnit
    },
    data () {
        return {
           
            tab: null,
            mdiDeleteCircle,
             mdiPlusCircle,
             mdiMessage,
             clear: mdiCancel,
            rules: [v => v.length <= 50 || 'Maximum 15 characters please.'],

            roomNumber: [1, 2, 3, 4, 6, 8, 10],
            bathroomNumber: [1, 2, 3, 4, 5],
            termsAll: ['morgage', 'rent', 'purchase'],
            categories: ["Apartment", "Mansionette", "Bedsitter", "Single room", "Double room", "Stall", "Workspace"],
            security: ["Bad", "Fair", "Good", "Very Good"],
            Years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],

             name: '',
            description: '',
            streetname: '',
            rooms: 1,
            bathrooms: 1,
            area: '',
            terms: ['rent'],
            category: "",
            priceAnnual: '',
            priceMonth: '',
            completionYear: "",
            securityLevel: "",
            parking: "",
            unitNumber: 1,
            submitStatus: null
        }
    },
    methods: {
        ...mapActions("company", ["addAgent", "removeAgent", "initCompanyAgents"]),
        
        showCompany() {
            return this.companies.find(company => company.owner == this.loggedInUser._id )
        }
        ,
        addSingleAgent(agentId) {
            let data = {
                companySlug: this.company.slug,
                agent: agentId
            }
            console.log("data", data)
            this.addAgent(data)
        },
        removeSingleAgent(agentId) {
            let data = JSON.stringify({
                companySlug: this.company.slug,
                agent: agentId
            })
        }
    },
    computed: {
        ...mapState({
             Messages: state => state.alert.Messages.map(n => n.Raw),
             companyAgents: state => state.company.agents
        })
    },
    created() {
            console.log("unitsoo", this.units),
            console.log("agentsoo", this.agents),
            this.initCompanyAgents(this.company.slug)
    }
}
</script>


