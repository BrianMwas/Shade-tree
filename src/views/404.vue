<template>
    <div class="d-flex justify-center">
        <v-img
            src="@/assets/404.png"
            :aspect-ratio="16/9"
            contain
        ></v-img>
        <h2 class="text-center black--text">
            Sorry we could not find that page...
        </h2>
    </div>
</template>

<script>
export default {
    name: "404"
}
</script>