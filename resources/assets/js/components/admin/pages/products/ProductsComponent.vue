<template>
<div>
    <h1>Listagem de Produtos</h1>

    <div class="row">
        <div class="col">
            <button class="btn btn-success" @click.prevent="create">
                Novo
            </button>

            <vodal :show="showModal" animation="zoom" @hide="hideModal" :width="600" :height="500">
                <product-form @success="success" :product="product" :update="update">
                </product-form>
            </vodal>
        </div>
        <div class="col">
            <search @search="searchForm">
            </search>
        </div>
    </div>

    <table class="table table-dark">
        <thead>
            <tr>
                <th width="150">Imagem</th>
                <th>Nome</th>
                <th width="200">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products.data" :key="product.id">
                <td>
                    <div v-if="product.image">
                        <img :src="[`/storage/products/${product.image}`]" :alt="product.name" class="img-list">
                    </div>
                </td>
                <td>{{ product.name }}</td>
                <td>
                    <a href="#" @click.prevent="edit(product.id)" class="btn btn-info">Editar</a>
                    <destroy :item="product" @destroy="destroy"></destroy>
                </td>
            </tr>
        </tbody>
    </table>

    <pagination :pagination="products" :offset="6" @paginate="loadProducts">
    </pagination>

</div>
</template>

<script>
import Vodal from 'vodal'

import PaginationComponent from '../../../layouts/PaginationComponent'
import SearchComponentVue from '../../layouts/SearchComponent'
import ProductForm from './partials/ProductForm'
import ButtonDestroyComponent from '../../layouts/ButtonDestroyComponent'

export default {
    created() {
        this.loadProducts(1)
    },
    data() {
        return {
            search: '',
            showModal: false,
            product: {
                id: '',
                name: '',
                description: '',
                category_id: '',
            },
            update: false
        }
    },
    computed: {
        products() {
            return this.$store.state.products.items
        },
        params() {
            return {
                page: this.products.current_page,
                filter: this.search,
            }
        }
    },
    methods: {
        loadProducts(page) {
            //"this.$store.dispatch('')" Recebe uma action
            this.$store.dispatch('loadProducts', {
                ...this.params,
                page
            })
        },

        create() {
            this.update = false

            this.showModal = true

            this.reset()
        },

        async edit(id) {

            this.reset()
            
            const response = await this.$store.dispatch('loadProduct', id)

            this.product = response

            this.showModal = true

            this.update = true
        },

        searchForm(filter) {
            this.search = filter

            this.loadProducts(1)
        },

        hideModal() {
            this.showModal = false
        },

        success() {
            this.hideModal()

            this.loadProducts(1)
        },

        reset() {
            this.product = {
                id: '',
                name: '',
                description: '',
                category_id: '',
            }
        },

        async destroy (id) {
            const response = await this.$store.dispatch('destroyProduct', id)
      
            if(response.status == 204) {
                this.$snotify.success('Deletado com sucesso!')

                this.loadProducts(1)
            } else {
                this.$snotify.error(`Erro ao deletar!`)
            }
        }
    },
    components: {
        pagination: PaginationComponent,
        search: SearchComponentVue,
        Vodal,
        ProductForm,
        destroy: ButtonDestroyComponent
    }
}
</script>

<style scoped>
    .img-list { max-width: 60px; }
</style>
