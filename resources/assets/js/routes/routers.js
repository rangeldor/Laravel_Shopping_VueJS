import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

import routes from './routers.map'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

// Cada rota passará por aqui antes
router.beforeEach((to, from, next) => {
    // Verifica se a pessoa está logada e se a rota pede autemticação
    if(to.meta.auth && !store.state.auth.authenticated) {
        // Passa a url atual para o commit do auth.js poder retornar o usuário novamente para esta url
        store.commit('CHANGE_URL_BACK', to.name)
        
        // Envia o usuário para a rota de login
        return router.push({name: 'login'})
    }
    
    if(to.matched.some(record => record.meta.auth) && !store.state.auth.authenticated) {
        // Passa a url atual para o commit do auth.js poder retornar o usuário novamente para esta url
        store.commit('CHANGE_URL_BACK', to.name)
        
        // Envia o usuário para a rota de login
        return router.push({name: 'login'})
    }
    
    if(to.meta.hasOwnProperty('auth') && !to.meta.auth && store.state.auth.authenticated) {
        return router.push({name: 'admin.dashboard'})
    }
    
    next()
})

export default router
