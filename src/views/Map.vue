<template>
    <div>
        <NavBar/>
        <v-content app>
            <div class="container">
                <div class="d-flex">
                    <div class="homes-list">
                        <h2 class="grey--text text--darken-1 m-0">Home List by location</h2>
                        <MapListViewCard/>
                        <MapListViewCard/>
                        <MapListViewCard/>
                    </div>
                    <v-sheet class="map-view" style="height: 80vh">
                        <h2>Our map</h2>
                    </v-sheet>
                </div> 
            </div> 
        </v-content>
        <Footer/>
    </div>
    
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import MapListViewCard from '@/components/MapListViewCard.vue'

export default {
    name: 'Maps',
    components: {
        NavBar,
        MapListViewCard,
        Footer
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/global.scss';

    .map-view {
        background: green;
        width: 60%;
    }

    .homes-list {
        width: 40%;
        padding: 0 20px;
        h2 {
            font-size: 1.8rem;
        }
    }

</style>