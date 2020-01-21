<template>
    <div class="search mr-5">
        <!-- <search-focus @keyup="focusSearch"></search-focus> -->
        <div>
            <v-text-field
            v-model="search"
            label="Search"
        
            autocomplete="off"
          
            width="400"
            dense
            :append-icon="mdiCancel"
            @click:append="reset"
            max-width="200"
            
            @blur="searchResultsVisible = false"
            @focus="searchResultsVisible = true"
            @keydown.esc="searchResultsVisible = false"
            @keydown.up.prevent="highlightPrevious"
            @keydown.down.prevent="highlightNext"
            @keydown="performSearch"
            @input="softReset"
            ref="search"
            ></v-text-field>
        </div>

        <!-- Results -->
        <div v-if="search.length > 0 && searchResultsVisible" class="searchResults">
            <div ref="results">
                <router-link v-for="(unit, i) in searchResults" :key="unit.id" :to="unit._id" :class="{ 'blue blue-lighten-3': i === highlightedIndex }">
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
                <p class="green--text">No results for "<strong class="grey--text">{{search}}</strong>"</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mdiCancel } from '@mdi/js'
import SearchFocus from './SearchFocus';
export default {
    name: 'Search',
    props: {
        dta: Array
    },
    components: {
        SearchFocus
    },
    data () {
        return {
            mdiCancel,
            search: '',
            searchResultsVisible: false,
            searchResults: [],
            highlightedIndex: 0,
            options: {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 3,
                keys: [
                    "price",
                    "description"
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
        },
        focusSearch(e) {
            if(e.key === "/") {
                this.$refs.search.focus()
            }
        },
        performSearch () {
            this.$search(this.query, this.dta, this.options)
            .then(results => {
                this.searchResults = results
            })
        },
        highlightPrevious() {
            if(this.highlightedIndex > 0) {
                this.highlightedIndex -= 1;
                scrollIntoView()
            }
        },
        highlightNext() {
            if(this.highlightedIndex < this.searchResults.length - 1) {
                this.highlightedIndex += 1;
                scrollIntoView()
            }
        },
        scrollIntoView() {
            this.$refs.results.children(this.highlightedIndex).scrollIntoView({ block: 'nearest' })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/global.scss';

    .search {
        position: relative;
        width: 30%;
        height: 20px;

        @include media('<medium') {
            width: 70%;
        }

        .searchResults {
            position: absolute;
            left: 0;
            z-index: 15;
            min-width: 100%;
            max-width: 400%;
            height: auto;
            height: auto;
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