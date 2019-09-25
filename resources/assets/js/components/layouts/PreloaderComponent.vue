<template>
    <div>
        <div class="preloader" v-show="preloader">
            <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
  <span class="sr-only">Loading...</span>
</div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        preloader() {
            return this.$store.state.preloader.loading
        }
    }    
}
</script>

<style scoped>
.preloader{
    background: #000;
    position: absolute;
    z-index: 9999;
    opacity: .4;
    width: 100%;
    height: 100%;
    margin: 0;
    text-align: center;
    padding: 45vh 0;
}
</style>