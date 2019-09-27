<template>
    <div>
        <ul class="nav bg-dark">
            <li class="nav-item">
                <router-link :to="{name: 'admin.dashboard'}" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item" v-if="typeof totalCategories !== 'undefined' && typeof totalCategories === 'object' && Object.keys(totalCategories).length > 0">
                <router-link :to="{name: 'admin.categories' }" class="nav-link">Categorias ({{ totalCategories.length}})</router-link>
            </li>
            <li class="nav-item" v-else>
                <router-link :to="{name: 'admin.categories' }" class="nav-link">Categorias </router-link>
            </li>
            <li>
                <router-link :to="{name: 'admin.products'}" class="nav-link">Produtos</router-link>
            </li>
        </ul>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        totalCategories(){ 
            return this.$store.state.categories.items.data.data   
        }        
    }
}
</script>

<style scoped>

</style>