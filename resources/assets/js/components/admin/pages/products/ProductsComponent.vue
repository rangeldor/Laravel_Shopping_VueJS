<template>
    <div>
        <h1>Listagem de Produtos</h1>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th width="200">Ações</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products.data" :key="product.id">
                        <td>...</td>
                        <td>{{ product.name }}</td>
                        <td>
                            <a href="#" class="btn btn-info">Editar</a>
                            <a href="#" class="btn btn-danger">Deletar</a>
                        </td>
                    </tr>
                </tbody>
        </table>

        <ul v-if="products.last_page > 1">
            <li v-if="products.current_page != 1">
                <a href="#" @click.prevent="loadProducts(products.current_page - 1)">
                    Anterior 
                </a>
            </li>
            <li v-if="products.current_page < products.last_page">
                <a href="#" @click.prevent="loadProducts(products.current_page + 1)">
                    Próximo 
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    created() {
        this.loadProducts(1)
    },
    computed: {
        products () {        
            return this.$store.state.products.items
        },
        params () {
            return {
                page: this.products.current_page
            }
        }
    },
    methods: {
        loadProducts(page) {
            //"this.$store.dispatch('')" Recebe uma action
            this.$store.dispatch('loadProducts', {...this.params, page})
        }
    }
}
</script>

<style scoped>

</style>
