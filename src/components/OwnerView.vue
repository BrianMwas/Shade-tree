<template>
    <div>
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
                <v-tabs v-model="tab" grow>
                  <v-tab>
                    Home
                  </v-tab>
                  <v-tab>
                    Manage Units
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
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
                            <v-btn color="green" depressed class="white--text" to="newunit">ADD Unit</v-btn>
                            <v-btn color="primary" v-if="company" text>EDIT Company</v-btn>
                            <v-btn v-else color="red darken-1">Add Company</v-btn>
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
                                <p class="text-center">You don't have any agents yet</p>
                                </div>
                                <div v-else>
                                <p>You have a couple of agents</p>
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
                                <v-list two-line>
                                <v-list-item class="agent-list" v-for="agent in agents" :key="agent._id">
                                    <v-list-item-content>
                                    <v-list-item-title>{{ agent.username }}</v-list-item-title>
                                    <v-list-item-subtitle><span class="font-weight-bold mr-3">{{ agent.email }}</span></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                </v-list>
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
                                <v-list-item v-for="unit in units.results" :key="unit._id">
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
                    </v-tab-item>
                    <v-tab-item>
                    <h2 class="black--text">Manage your units</h2>
                    <v-divider class="grey lighten-1"></v-divider>
                        <v-expansion-panels>
                        <v-expansion-panel
                            v-for="unit in units"
                            :key="unit._id"
                        >
                            <v-expansion-panel-header>{{unit.name}}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            <v-card>

                            </v-card>
                            <v-card>
                                <v-card-text class="p-3">
                                <picture-input 
                                    ref="pictureInput" 
                                    @change="onChange" 
                                    @remove="onRemoved"
                                    width="300" 
                                    height="300" 
                                    margin="16" 
                                    buttonClass="button button-primary"
                                    accept="image/jpeg,image/png" 
                                    size="10" 
                                    :removable="true"
                                    :customStrings="{
                                    upload: '<h1>Upload!</h1>',
                                    drag: 'Drag the unit image here'
                                    }">
                                </picture-input>
                                <v-card-action>
                                    <button @click="addImage(unit._id)" class="button button-block button-primary" :disabled="!image">
                                    Add Image
                                    </button>
                                </v-card-action>
                                </v-card-text>
                            </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        </v-expansion-panels>
                    </v-tab-item>
                </v-tabs-items>
    </div>
</template>

<script>

import PictureInput from 'vue-picture-input';
import { mapActions, mapState } from "vuex"

export default {
    props: ["units", "loggedInUser", "company", "agents"],
    name: "owner-view",
    components: {
        PictureInput
    },
    data () {
        return {
            unitImage: null,
        }
    },
    methods: {
        ...mapActions("unit", ["addUnitImages"]),
        onChange () {
          console.log('New picture selected!')
          if (this.$refs.pictureInput.image) {
            console.log('Picture loaded.')
          } else {
            console.log('FileReader API not supported: use the <form>, Luke!')
          }
        },
        onRemoved() {
          this.unitImage = '';
        },
        showCompany() {
            return this.companies.find(company => company.owner == this.loggedInUser._id )
        },
        addImage(unitId) {
            if(this.unitImage) {
                let data = {
                    image : this.unitImage,
                    companySlug: this.company.slug,
                    unitId,
                }
                this.addUnitImage(data)
            }
        }
    },
    computed: {
        ...mapState({
             Messages: state => state.alert.Messages.map(n => n.Raw)
        })
    }
}
</script>