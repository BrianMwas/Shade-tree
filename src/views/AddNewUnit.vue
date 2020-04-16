<template>
    <div>
        <NavBar/>
        <v-content app transition="fade-transition">
            <div class="my-16 mx-a container" justify="center">
                <AddUnit/>
            </div>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddUnit from '@/components/AddUnit.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'AddNewUnit',
    components: {
        AddUnit,
        NavBar,
        Footer
    }
}
</script>

<style lang="scss" scoped>


    .my-16 {
        margin: 16 auto;
    }

    .mx-a {
        margin-left: auto;
        margin-right: auto;
    }
</style>
