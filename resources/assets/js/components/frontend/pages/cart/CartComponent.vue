<template>
<div>
    <h1>Carrinho de compras</h1>
    <div class="row">
        <div class="col-12" v-for="product in cart.products" :key="product.id">
            <div v-if="product.image">
                <img :src="[`/storage/products/${product.image}`]" :alt="product.name" class="img-list">
            </div>
            <div v-else>
                <img src="/imgs/no-img.png" :alt="product.name" class="img-list">
            </div>
            <div class="col-7">
                {{ product.name }}
            </div>
            <div class="col-3">
                <button class="btn btn-danger" @click.prevent="removeCart(product)">
                    Remover Carrinho
                </button>
            </div>
            <hr>
        </div>
    </div>
</div>
</template>

<script>
export default {
    computed: {
        cart() {
            return this.$store.state.cart
        }
    },

    methods: {
        removeCart(product) {
            this.$store.commit('REMOVE_PRODUCT_CART', product)
        }
    },
}
</script>

<style scoped>
.img-list {
    max-width: 60px;
}
</style>
