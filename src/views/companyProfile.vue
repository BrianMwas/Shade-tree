<template>
	<div>
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
        <v-content dark transition="fade-transition" app>
        	<v-container>
        		<CompanyProfile/>
        	</v-container>
        </v-content>
        <Footer/>
	</div>
</template>


<script>
	import NavBar from '@/components/NavBar.vue'
	import Footer from '@/components/Footer.vue'
	import CompanyProfile from '@/components/companyProfile'
	import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
	const { mapGetters } = createNamespacedHelpers('auth')
	
	export default {
		components : {
			NavBar,
			Footer,
			CompanyProfile
		},
		data () {
			return {
				
			}
		},
		methods: {
			...mapActions('auth', ['logOutUser'])
		},
		computed: {
			...mapState({
				loggedIn: state => state.auth.status
			}),
			...mapGetters(['loggedInUser', 'loggedInUserType', 'logged'])
		}
	}
</script>