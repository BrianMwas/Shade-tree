<template>
    <div class="blog-card">
        <div class="title">
            <h2 class="h2">{{title}}</h2>
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
        <div class="summary">
            <p class="h6-mobile d-block text-truncate" style="max-width: 300px">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolorem unde optio quam, architecto nobis cumque qui debitis neque, labore maxime deleniti. Vitae excepturi placeat rerum quo. Porro, nemo omnis. Minus numquam commodi cumque, laborum doloribus aut sapiente ratione beatae fuga fugit quas provident in nam suscipit illo soluta iure molestias eius.</p>
        </div>

    </div>
</template>

<script>
export default {
    name: 'BlogCard',
    props: ['title'],
    data () {
        return {
            title: this.title
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/scss/global.scss';

    .blog-card {
        position: relative;
        display: flex;
        flex-direction: column;
        transition: background-color ease-in 150ms;

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
                font-weight: bold;
                color: color(typography, 2);
                margin: 25px 0;
                text-transform: capitalize;
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

        .summary {
            width: 100%;
            padding: 0 10px;

            p {
                line-height: 2;
                font-size: 1.15rem;
            }
        }
    }
</style>