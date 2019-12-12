<template>
    <header>
        <div>
            <h2 display-3>We make your finding a new home as easy as a click...</h2>
            <h4 display-1>Filter through the many choices of units at the comfort of your couch...</h4>
        </div>
        <!-- <div>
            <v-text-field
                filled
                label="search"
                background-color="white"
            >
            </v-text-field>
        </div> -->
    </header>
</template>

<script>


export default {
    name: 'AdvertHeader',
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/abstracts/_include_media.scss';


header {
    width: 100%;
    height: auto;
    background: url('../assets/brick-wall.jpg') no-repeat center;
    padding: 3em 2em 5em 2em;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    display: flex;
    flex-direction: column;

    @supports (display: grid) {
        display: grid;
        place-items: center;
    }

    @supports not (display: grid) {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    
    &::after {
        content: '';
        position: absolute;
        background: linear-gradient(-45deg, transparent 0%, rgba(16, 161, 93, 0.863) 100%);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    div:first-of-type {
        position: relative;
        z-index: 1;
        min-width: 40%;
        margin: auto;
        height: auto;

        @include media('>medium') {
            padding: 5em 2em;
        }

        @supports (display: grid) {
            display: grid;
            place-items: center;
        }

        @supports not (display: grid) {
            display: flex;
            justify-content: center;
            align-content: center;
        }

        @include media('>medium') {
            width: 80%;
            text-align: center;
            margin: auto;
        }

        h2 {
            padding: 0;
            margin: 0;

            @include media('>medium') {
                font-weight: bold;
                color: white;
            }
        }

        h4 {
             color: white;
            font-weight: 200 !important;
        }

    }
    // div:nth-child(2) {
    //     position: absolute;
    //     bottom: 60px;
    //     right: 0;
    //     display: flex;
    //     justify-content: center;
    //     padding: 2em;
    //     width: 100%;
    //     height: auto;
    // }
}

</style>