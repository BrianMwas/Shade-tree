<template>
    <div>
        <div class="map-card">
            <v-img
            aspect-ratio="16/9"
            src="@/assets/seat.jpg">
            </v-img>
            <div class="map-info">
                <h2 class="green--text h5">James Gichuru</h2>
                <h5 class="grey--text font">Nairobi</h5>
                <p class="grey--text">
                    <span>
                        <v-icon class="yellow--text">{{ star }}</v-icon>
                    </span>
                        4.3
                </p>
                <p>by <span class="font-weight-bold">Luna apartments</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mdiStar } from '@mdi/js'

export default {
    name: 'MapCard',
    data () {
        return {
            star: mdiStar
        }
    }
}
</script>

<style lang="scss" scoped>
    .map-card {
        display: flex;
        flex-direction: row;
        min-width: 50%;
        margin: 30px 0;
        
        .v-img {
            border-radius: 10px;
            max-height: 20% !important;
        }

        .map-info {
            display: block;
            height: auto;
            margin-left: 15px;

            h2, h5, p {
                margin: 0 !important;
            } 

            h5 {
                font-size: 1.2rem;
            }
        }
    }
</style>