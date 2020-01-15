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
                    src="@/assets/seat.jpg"
                    :aspect-ratio="16/9"
                    min-width="200"
                >
                    <v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1 class="font-weight-light">{{ titleOne }}</h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>
             <v-col
                cols="12"
                sm="12"
                md="7"
                lg="4"
                class="hidden-md-and-down"
            >
                <v-img
                    src="@/assets/green pot.jpg"
                    :aspect-ratio="16/9"
                    min-width="200"
                ><v-row align="end" class="hidden-md-and-down  lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading font-weight-light">
                                <h1 class="font-weight-light">{{ titleTwo }}</h1>
                            </div>
                        </v-col>
                    </v-row></v-img>
            </v-col>
             <v-col
                cols="12"
                sm="12"
                md="7"
                lg="4"
                class="hidden-md-and-down"
            >
                <v-img
                    src="@/assets/brick-wall.jpg"
                    :aspect-ratio="16/9"
                    min-width="200"

                >
                    <v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1 class="font-weight-light">{{ titleThree }}</h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>
        </v-row>
        <v-row class="hidden-md-and-down">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="6"
            >
                <v-img
                    :aspect-ratio="16/9"
                    src="@/assets/ginger-pot.jpg"
                    min-width="200"

                >
                    <v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1 class="font-weight-light">{{ titleFour }}</h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
            </v-col>
             <v-col
                cols="12"
                sm="12"
                md="6"
                lg="6"
            >
                <v-img
                    :aspect-ratio="16/9"
                    src="@/assets/big-leaf.jpg"
                    min-width="200"

                ><v-row align="end" class="lightbox white--text fill-height pa-2">
                        <v-col>
                            <div class="heading">
                                <h1 class="font-weight-light">{{ titleFive }}</h1>
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
    props: ['titleOne', 'titleTwo', 'titleThree', 'titleFour', 'titleFive']
}
</script>

<style lang="scss" scoped>
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, .45);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 20%, transparent 72px);
  }
</style>