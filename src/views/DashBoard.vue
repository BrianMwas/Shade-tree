<template>
    <div>
        <v-content app>
            <v-container>
                <h2 class="black--text">Dashboard</h2>
                <button @click="showParam" class="btn">Log</button>
            </v-container>
        </v-content>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    methods: {
        showParam () {
            console.log(this.$router.params)
        }
    },
    computed : {
        paramer () {
            return this.$route.params.username
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn {
        background-color: #3a3a3a;
        color: white;
        padding: 1em .75em;
        width: 20%;
        box-shadow: 0 10px 35px currentColor;

        &:hover {
            background-color: dimgray;
        }
    }

</style>