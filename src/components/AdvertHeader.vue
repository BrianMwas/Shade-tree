<template>
    <div>
        <v-row>
            <v-col
                cols="12"
                sm="12"
                md="7"
                lg="4"
            >
                <v-img
                    :src="imageOne"
                :aspect-ratio="16/9"

                ><v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1>{{ titleOne }}</h1>
                            </div>
                        </v-col>
                    </v-row></v-img>
            </v-col>
             <v-col
                cols="12"
                sm="12"
                md="7"
                lg="4"
            >
                <v-img
                    :src="imageTwo"
                :aspect-ratio="16/9"

                ><v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1>{{ titleTwo }}</h1>
                            </div>
                        </v-col>
                    </v-row></v-img>
            </v-col>
             <v-col
                cols="12"
                sm="12"
                md="7"
                lg="4"
            >
                <v-img
                    :src="imageThree"
                :aspect-ratio="16/9"

                >
                    <v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1>{{ titleThree }}</h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="6"
            >
                <v-img
                    :aspect-ratio="16/9"
                    :src="imageFour"
                >
                    <v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1>{{ titleFour }}</h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>
             <v-col
                cols="12"
                sm="12"
                md="6"
                lg="4"
            >
                <v-img
                :aspect-ratio="16/9"
                    :src="imageFive"
                ><v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1>{{ titleFive }}</h1>
                            </div>
                        </v-col>
                    </v-row></v-img>
            </v-col>
        </v-row>
    </div>
</template>

<script>


export default {
    name: 'AdvertHeader',
    props: ['imageOne', 'titleOne', 'imageTwo', 'titleTwo', 'imageThree', 'titleThree', 'imageFour', 'titleFour', 'imageFive', 'titleFive']
}
</script>

<style lang="scss" scoped>
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, .45);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 20%, transparent 72px);
  }
</style>