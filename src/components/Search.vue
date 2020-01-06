<template>
    <div class="search">
        <div>
            <v-text-field
            v-model="search"
            label="Search"
            filled
            autocomplete="off"
            color="green darken-3"
            width="200"
            :append-icon="mdiCancel"
            @click:append="reset"
            max-width="200"
            background-color="white"
            @blur="searchResultsVisible = false"
            @focus="searchResultsVisible = true"
            @keydown.esc="searchResultsVisible = false"
            @input="softReset"
            ref="search"
        ></v-text-field>
        </div>
    
        <div v-if="search.length > 0 && searchResultsVisible">
            <div>
                <router-link to="/blogs">
                    <span>
                        KSH 45000
                    </span>
                    
                    <span>
                        <h5 color="grey darken-4">James Gichuru Rd</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae iure ab voluptate adipisci laboriosam explicabo quas voluptatem, impedit pariatur eum eius ex, magnam, illo reprehenderit iste vitae iusto alias fugiat!</p>
                    </span>
                </router-link>
            </div>
            <v-divider style="padding: 0; margin: 5px; background-color: grey;"></v-divider>
            <div>
                <p>No results for "<strong>{{search}}</strong>"</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mdiCancel } from '@mdi/js'

export default {
    name: 'Search',
    data () {
        return {
            mdiCancel,
            search: '',
            searchResultsVisible: false,
            options: {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 3,
                keys: [
                    "title",
                    "author.firstName"
                ]
            }
        }
    },
    methods: {
        reset () {
            this.search ='';
        },
        softReset () {
            this.searchResultsVisible = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/global.scss';

    .search {
        position: relative;

        div:nth-child(2) {
            position: absolute;
            left: 0;
            z-index: 15;
            min-width: 100%;
            max-width: 400%;
            height: auto;
            min-height: 25vh;
            overflow-y: scroll;
            background: white;
            text-align: left;
            margin-bottom: 4px;
            box-shadow: 0 10px 35px rgba(0, 0, 0, .26);
            border-radius: 10px;
            transition: background-color ease-in 150ms;

            &:hover {
                div:first-child a{
                 background-color: whitesmoke;
                }
            }

            div {
                padding: 10px 15px;
            }

            div a span:first-child{
                font-size: 1.5rem;
                color: color(green, 4);
                text-decoration: none;
                font-weight: 700;
                display: block;
            }

            div a > span:nth-child(2) {
                font-weight: normal;
                font-size: 1.1rem;
                color: color(typography, 4);

                h5 {
                    font-size: 1.2rem;
                    color: color(green, 3);
                    margin: 0 !important;
                }
            }

        }
    }
</style>