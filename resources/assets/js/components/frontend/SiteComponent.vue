<template>
<div>
    <header-site></header-site>

    <router-view></router-view>

    <footer-site></footer-site>
</div>
</template>

<script>
import SiteFooterComponent from './SiteFooterComponent'
import SiteHeaderCOmponent from './SiteHeaderComponent'

export default {
    components: {
        footerSite: SiteFooterComponent,
        headerSite: SiteHeaderCOmponent
    }
}
</script>

<style scoped>

</style>
