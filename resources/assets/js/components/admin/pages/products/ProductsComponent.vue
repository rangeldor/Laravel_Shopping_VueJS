<template>
    <div>
        <h1>Listagem de Produtos</h1>

        <div class="row">
            <div class="col">
                <button class="btn btn-success" @click.prevent="showModal = true">
                    Novo
                </button>

                <vodal
                    :show="showModal"
                    animation="zoom"
                    @hide="hideModal"
                    :width="600"
                    :height="500">
                    <product-form></product-form>
                </vodal>
            </div>
            <div class="col">
                <search 
                    @search="searchForm">
                </search>
            </div>
        </div>

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

        <pagination
            :pagination="products"
            :offset="6"
            @paginate="loadProducts">
        </pagination>
        
    </div>
</template>

<script>
import Vodal from 'vodal'

import PaginationComponent from '../../../layouts/PaginationComponent'
import SearchComponentVue from '../../layouts/SearchComponent'
import ProductForm from './partials/ProductForm'

export default {
    created() {
        this.loadProducts(1)
    },
    data () {
        return {
            search: '',
            showModal: false,
        }
    },
    computed: {
        products () {        
            return this.$store.state.products.items
        },
        params () {
            return {
                page: this.products.current_page,
                filter: this.search,
            }
        }
    },
    methods: {
        loadProducts(page) {
            //"this.$store.dispatch('')" Recebe uma action
            this.$store.dispatch('loadProducts', {...this.params, page})
        },

        searchForm (filter) {
            this.search = filter

            this.loadProducts(1)
        },

        hideModal () {
            this.showModal = false
        }
    },
    components: {
        pagination: PaginationComponent,
        search: SearchComponentVue,
        Vodal,
        ProductForm,
    }
}
</script>

<style scoped>

</style>
