import Vue from 'vue'
import Vuex from 'vuex'

import Categories from './modules/categories/categories'
import preloader from './modules/preloader/preloader'
import products from './modules/products/products'
import cart from './modules/cart/cart'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        categories: Categories,
        preloader,
        products,
        cart,
    }
})

export default store