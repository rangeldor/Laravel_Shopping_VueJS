import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

import AdminComponent from '../components/admin/AdminComponent.vue'
import CategoriesComponent from '../components/admin/pages/categories/CategoriesCompponent'
import DashboardComponent from '../components/admin/pages/dashboard/DashboardComponent'
import AddCategoryComponent from '../components/admin/pages/categories/AddCategoryComponent'
import EditCategoryComponent from '../components/admin/pages/categories/EditCategoryComponent'
import ProductsComponent from '../components/admin/pages/products/ProductsComponent'
import HomeComponent from '../components/frontend/pages/home/HomeComponent'
import SiteComponent from '../components/frontend/SiteComponent'
import ContactComponent from '../components/frontend/pages/contact/ContactComponent'
import ProductDetail from '../components/frontend/pages/product/ProductDetail'
import CartComponent from '../components/frontend/pages/cart/CartComponent'
import LoginComponent from '../components/frontend/pages/login/LoginComponent'
import RegisterComponent from '../components/frontend/pages/user/RegisterComponent'
import ProfileComponent from '../components/frontend/pages/user/ProfileComponent'

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: SiteComponent, 
        children: [
            {path: 'login', component: LoginComponent, name: 'login', meta: {auth: false}},
            {path: 'register', component: RegisterComponent, name: 'register', meta: {auth: false}},
            {path: 'meu-perfil', component: ProfileComponent, name: 'profile', meta: {auth: true}},
            {path: 'carrinho', component: CartComponent, name: 'cart'},
            {path: 'produto/:id', component: ProductDetail, name: 'product.detail', props: true},
            {path: 'contato', component: ContactComponent, name: 'contact'},
            {path: '', component: HomeComponent, name: 'home'},            
        ]
    },
    {
        path: '/admin', 
        component: AdminComponent,
        meta: {auth: true},
        children: [
            {path: '', component: DashboardComponent, name: 'admin.dashboard'},
            {path: 'categories', component: CategoriesComponent, name: 'admin.categories'},    
            {path: 'categories/create', component: AddCategoryComponent, name: 'admin.categories.create'}, 
            {path: 'categories/:id/edit', component: EditCategoryComponent, name: 'admin.categories.edit', props: true},   
             
            {path: 'products', component: ProductsComponent, name: 'admin.products'},
        ]
    },    
]

const router = new VueRouter({
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
