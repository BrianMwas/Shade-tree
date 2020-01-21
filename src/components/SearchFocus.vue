<template>
    <div></div>
</template>

<script>
export default {
    name: "search-focus",
    mounted() {
        this.handler = event => {
            this.$emit('keyup', event)
        }

        window.addEventListener('keyup', this.handler)
    },
    beforeDestroy () {
        window.removeEventListener('keyup', this.handler)
    }
}
</script>

<style lang="scss" scoped>
    div {
        display: none;
    }
</style>