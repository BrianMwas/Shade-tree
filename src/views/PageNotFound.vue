<template>
    <div>
        <v-content app>
            <v-container class="d-flex justify-center">
           <v-card
            max-width="700"
            flat
            class="img-card"
            >
            <v-img
                src="@/assets/404.png"
                :aspect-ratio="1.7"
                contain
                class="m-5"
            ></v-img>
            <v-card-text class="p-5">
                <h2 class="text-center font-weight-bold black--text display-1 m-5">
                    Page not found
                </h2> 
            </v-card-text>
        </v-card>
        
        
        </v-container>
        </v-content>
        
        
    </div>
</template>

<script>
export default {
    name: "PageNotFound"
}
</script>

<style lang="scss" scoped>
    .img-card {
        margin: auto;
    }

    .d-flex {
        height: 80vh;
        width: 100%;
        justify-content: center;
        align-content: center;
    }

    .m-5 {
        margin: 1.5em;
    }
</style>