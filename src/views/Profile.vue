<template>
	<div>
		<NavBar loggedIn="loggedIn" :user="loggedInUser.username" v-if="loggedIn" #loggedInRoutes>
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
	           Log Out
	         </v-btn>
	         <v-btn text v-if="loggedInUserType == 'owner'">
	           <router-link to="/logout" class="link">Add Unit</router-link>
	         </v-btn>
        </NavBar>
        <NavBar v-else #default>
            <v-btn text>
              <router-link to="/units" class="link">units</router-link>
            </v-btn>
           
            <v-btn text>
              <router-link to="/blogs" class="link">blogs</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/login" class="link">log in</router-link>
            </v-btn>
            <v-btn text>
              <router-link to="/signup" class="link">Sign up</router-link>
            </v-btn>
        </NavBar>
        <v-content app dark>
        	<v-container>
        		<user-profile :userProfile="userProfile"></user-profile>
        	</v-container>
        </v-content>
        <Footer/>
	</div>
</template>

<script>
	import userProfile from '@/components/userprofile.vue';
	import NavBar from '@/components/NavBar.vue';
	import Footer from '@/components/Footer.vue';

	import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
	const { mapGetters } = createNamespacedHelpers('auth');

	export default {
		name: 'Profile',
		components: {
			NavBar,
			'user-profile': userProfile,
			Footer
		},
		data() {
			return {
				userProfile: {}
			}
		},
		created() {
			this.userProfile = this.$cookies.get('userProfile')
		},
		computed: {
			...mapGetters(['loggedInUser', 'loggedInUserType', 'logged']),
			...mapState({
				loggedIn: state => state.auth.status,
				settingProfile: state => state.profile.settingUserProfile,
			})
		},
		methods: {
      		...mapActions('auth', ['logOutUser'])
		}
	}
</script>