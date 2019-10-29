require('./bootstrap');
window.Vue = require('vue');
import Snotify from 'vue-snotify'

import router from './routes/routers'
import store from './vuex/store'

Vue.use( Snotify, { toast: { showProgressBar: true } } )

/**
 * Components globais
 */

 Vue.component('admin-component', require('./components/admin/AdminComponent'))
 Vue.component('preloader-component', require('./components/layouts/PreloaderComponent'))

const app = new Vue({
    router,
    store,
    el: '#app'
});

store.dispatch('loadCategories')
store.dispatch('checkLogin')
        .then(() => router.push({name: store.state.auth.urlBack}))
