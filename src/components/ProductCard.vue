<template>
    <v-hover
        v-slot:default="{ hover }"
        close-delay="200"
    >
        <v-card
            :elevation="hover ? 12 : 2"
            class="mx-auto rounded"
            color="white lighten-5"
            max-width="300"
            min-height="325"
            min-width="290"
        >
            <v-img
                :aspect-ratio="16/9"
                src="@/assets/green pot.jpg"
            >
            </v-img>
            
            <v-card-title
                class="green--text text--darken-3 font-weight-bold"
            >
                KSH 600
            </v-card-title>
            <v-card-subtitle class="font-weight-bold">
                RoseMary flower
            </v-card-subtitle>
            <v-card-text class="font-weight-regular text-truncated">
                <template v-slot:extension>
                <v-btn
                    fab
                    color="green accent-2"
                    bottom
                    right
                    absolute
                >
                    <v-icon>{{ shop }}</v-icon>
                </v-btn>
            </template>
            <p>The rosemary plant is a herbal plant used for seasoning meat and adding flavour to drinks</p>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
import { mdiShopping } from '@mdi/js'

export default {
    name: 'ProductCard',
    data () {
        return {
            shop: mdiShopping
        }
    }
}
</script>

<style lang="scss" scoped>
    .rounded {
        border-radius: 10px !important;
    }
</style>