<template>
	<div>
		<NavBar v-if="logged" #loggedInRoutes>
          <v-btn text>
            <router-link to="/dashboard" class="link">dashboard</router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/units" class="link">units</router-link>
          </v-btn>
         
           <v-btn text>
            <router-link to="/blogs" class="link">blogs</router-link>
           </v-btn>
           <v-btn text @click="logOutUser">
            LOG OUT
           </v-btn>
           <!-- <v-btn text v-if="loggedInUserType == 'owner'">
             <router-link to="/logout" class="link">Add Unit</router-link>
           </v-btn> -->
        </NavBar>
        <NavBar v-else #default>
          <v-btn text>
            <router-link to="/blogs" class="link">blogs</router-link>
           </v-btn>
            <v-btn text>
              <router-link to="/units" class="link">units</router-link>
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
        		<div v-if="unitsByQuery.length <= 0">
        		<h2 class="display-3 grey--text text-center">
        			Sorry there are no units under {{ $route.query.category}}
        		</h2>
        	</div>
        	<div v-else>
        	
    			<v-row>
    				<v-col 
    				cols="12" 
    				md="4" 
    				lg="4" 
    				xs="12" 
    				sm="12" 
    				v-for="unit in unitsByCategory" 
    				:key="unit._id"
    				>
    					<unit 
    					:unit="unit"
    					></unit>
    				</v-col>
    			</v-row>
        	
        	</div>
        	</v-container>
        	
        </v-content>
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	import NavBar from '@/components/NavBar.vue'
	import Footer from '@/components/Footer.vue'
	import Card from '@/components/HomeCard.vue'

	export default {
		name: "unit-search",
		components: {
			NavBar,
			Footer,
			'unit': HomeCard
		},
		methods: {
			...mapActions("unit", ["unitsBySearch"]),
			getUnitByCategory() {
				this.unitsBySearch(this.$route.query.category)
			}
		},
		computed: {
			...mapState("unit", ["unitsByQuery"])
		},
		watch: {
			$route : {
		    immediate: true,
		     handler(to, from) {
		      this.getUnitByCategory()
		    }
		  }
		}
	}
	
</script>