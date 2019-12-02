<template>
    <div>
        <NavBar/>
        <v-content app>
            <v-container>
                <BlogCard title="Home decor"/>
                <BlogCard title="Choosing the right paint"/>
                <BlogCard title="What tile goes with your living room"/>
                <BlogCard title="Getting started to DIY"/>
                <BlogCard title="dIY your own kitchen garden"/>
                <BlogCard title="Cleaning your walls"/>
                <BlogCard title="finding the right toilet seat"/>
            </v-container>
        </v-content>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import BlogCard from '@/components/BlogCard.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: 'Blog',
    components: {
        BlogCard,
        NavBar,
        Footer
    }
}
</script>


<style lang="scss" scoped>

</style>