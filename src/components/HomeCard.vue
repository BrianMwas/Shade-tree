<template>
  <v-hover 
    v-slot:default="{ hover }"
    close-delay="200">
    <v-card
      :elevation="hover ? 12 : 2"
      class="mx-auto"
      color="white lighten-5"
      max-width="350"
      min-width="280"
    >
      <v-img
        :aspect-ratio="16/9"
        src="@/assets/home.jpg"
      >
      </v-img>
      <v-card-title
        class="pb-0 font-weight-medium"
      >
        <span class="mr-2">
          <v-icon class="red--text">{{ road }}</v-icon>
        </span>
          James Gichuru Rd
      </v-card-title>

      <div class="mx-2">
          <v-chip-group
            mandatory
            text-color="white"
          >
            <v-chip
            color="white"
            >
              <v-avatar left>
                <v-icon class="teal--text text-lighten-4">{{ bed }}</v-icon>
              </v-avatar>
              2
            </v-chip>
            <v-chip
              color="white"
            >
              <v-avatar left>
                <v-icon class="teal--text text-lighten-4">{{ areaSpace }}</v-icon>
              </v-avatar>
              200 
            </v-chip>
            <v-chip
              color="white"
            >
              <v-avatar left>
                <v-icon class="teal--text text-lighten-4">{{ bathrooms }}</v-icon>
              </v-avatar>
              1
            </v-chip>
          </v-chip-group>
      </div>
      
      <v-card-actions>
        <v-btn depressed small>
          see more
          <span class="ml-3">
            <v-icon class="teal--text">{{ arrowRight }}</v-icon>
          </span>
        </v-btn>
      </v-card-actions>
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

</style>
