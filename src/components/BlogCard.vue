<template>
    <div class="blog-card my-4" @click="gotoBlog">
        <div class="blog-img">
            <img src="@/assets/big-leaf.jpg" alt="Big leaf">
        </div>
        <div class="blog-card-info">
            <div class="title">
                <h2 class="h3">{{title}}</h2>
            </div>
            <div class="tags">
                <ul>
                    <li>
                        <p>decor</p>
                    </li>
                    <li>
                        <p>Paint color</p>
                    </li>
                    <li>
                        <p>Tiles</p>
                    </li>
                </ul>
            </div>
            <p class="font-italic published">Published on January 23</p>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'BlogCard',
    props: ['title'],
    methods: {
        gotoBlog () {
            this.$router.push('/single-blog')
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/scss/global.scss';

    .blog-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;

        @include media('>=medium') {
            flex-direction: row;
        }
    }

    .blog-img {
        flex-grow: 1;
        display: none;

        @include media('<=medium') {
            display: inline-block;
        }
    
         img {
             width: 400px;
             height: 200px;
         }
    }

    .blog-card-info {
        position: relative;
        display: block;
        transition: background-color ease-in 150ms;
        flex-grow: 2;
        height: 200px;
        padding-bottom: 10px; 
        

        &:hover {
            background-color: color(typography, 3);

            .title h2 {
                color: color(typography, 1);
            }

            .tags ul li {
                background: color(green, 4);
            }

            .tags ul li p {
                color: whitesmoke;
            }

            .summary p {
                color: white;
            }
        }

        .title {
            text-align: left;
            margin: 0;
            padding: 0 10px;

            h2 {
                color: color(typography, 2);
                text-transform: capitalize;
                margin: 10px auto;

                @include media('<=medium') {
                    margin: 15px 0;
                }
            }
        }

        .tags {
            padding: 0 10px;
            margin: 0;

            ul {
                margin: 0;
                padding: 0;
            }
        }

        .tags ul{
            display: flex;
            flex-direction: row;

            li {
                background-color: color(bg, 4);
                list-style: none;
                padding: 10px;
                margin-bottom: 20px;
                border-radius: 4px;
            }

            li:not(:first-child) {
                margin-left: 10px;
            }

            li p {
                margin: auto 0;
                color: white;
                text-transform: capitalize;
            }
        }

        @include media('>medium') {
            width: 100%;
        }

        p.published {
            padding: 0 10px 15px;
            margin: 0;
        }
    }
</style>