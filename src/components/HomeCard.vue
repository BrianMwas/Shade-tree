<template>
  <v-hover 
    v-slot:default="{ hover }"
    close-delay="200">
    <v-card
      :elevation="hover ? 12 : 2"
      class="mx-auto rounded"
      color="white lighten-5"
      min-width="290"
      max-width="325"
      min-height="325"
      flat
    >
      <v-img
        :aspect-ratio="16/9"
        src="@/assets/seat.jpg"
      >
      </v-img>
      <v-card-title
        class="pb-0 mb-2 font-weight-bold card-price"
        style="position: relative"
      >
          Ksh 40000
          <span class="term">
            pm
          </span>
          <v-btn
                    fab
                    color="green darken-2"
                    top
                    right
                    absolute
                    to="/single-unit"
                    
                >
                    <v-icon color="white">{{ arrowRight }}</v-icon>
                </v-btn>
      </v-card-title>
      <v-card-subtitle class="card-street mt-2" style="dimgray">
        James Gichuru rd
      </v-card-subtitle>
      <v-card-text>
          <v-chip-group
            mandatory
            text-color="white"
          >
            <v-chip
            color="white"
            >
              <v-avatar left>
                <v-icon class="grey--text text-lighten-4">{{ bed }}</v-icon>
              </v-avatar>
              2
            </v-chip>
            <v-chip
              color="white"
            >
              <v-avatar left>
                <v-icon class="grey--text text-lighten-4">{{ areaSpace }}</v-icon>
              </v-avatar>
              200
              <sup>sq</sup>
            </v-chip>
            <v-chip
              color="white"
            >
              <v-avatar left>
                <v-icon class="grey--text text-lighten-4">{{ bathrooms }}</v-icon>
              </v-avatar>
              1
            </v-chip>
          </v-chip-group>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import {  mdiArrowRight, mdiMapMarker, mdiChevronDown, mdiChevronUp, mdiShapeSquarePlus, mdiToilet, mdiBedEmpty } from "@mdi/js";

export default {
  name: 'Card',
  props: {
    StreetName: String,
    Price: Number,
    NumberOfRooms: Number,
    NumberOfBathrooms: Number,
    AreaSpace: Number,
    ImageSrc: String
  },
  data () {
    return {
      arrow: mdiArrowRight,
      road: mdiMapMarker,
      expandUp: mdiChevronUp,
      expandDown : mdiChevronDown,
      show: false,
      bed: mdiBedEmpty,
      areaSpace : mdiShapeSquarePlus,
      bathrooms: mdiToilet,
      arrowRight: mdiArrowRight
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';
  
  .card-price {
    color: color(green, 2) !important;
    font-family: 'Nunito' sans-serif !important;
    font-size: 1.25rem;
  }

  .term {
    color: dimgray;
    font-size: .75rem;
    font-weight: 300;
  }

  .card-street {
    color: color(typography, 4);
    font-size: 1.2rem;
  }

  .rounded {
    border-radius: 10px !important;
  }
</style>
