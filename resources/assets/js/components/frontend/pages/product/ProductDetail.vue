<template>
<div>
    <h1>{{ product.name }}</h1>

    <div v-if="product.image">
        <img :src="[`/storage/products/${product.image}`]" :alt="product.name" class="img-list">
    </div>
    <div v-else>
        <img src="/imgs/no-img.png" :alt="product.name" class="img-list">
    </div>
    <div>
        {{ product.description }}
    </div>
</div>
</template>

<script>
export default {
    props: ['id'],

    created() {
        this.loadProduct()
    },

    data() {
        return {
            product: {}
        }
    },

    methods: {
        async loadProduct() {
            try {
                const product = await this.$store.dispatch('loadProduct', this.id)

                this.product = product
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>

<style scoped>

</style>
