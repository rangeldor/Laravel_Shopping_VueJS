<template>
<div>
    <sidebar-menu :menu="menu" width="300px" :theme="theme" :collapsed="collapsed" @item-click="onItemClick" @toggle-collapse="onToggleCollapse"/>

    <div class="container">
        <fade-transition>
            <router-view></router-view>
        </fade-transition>
    </div>
</div>
<!--  <div>
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
                <router-link :to="{name: 'admin.products'}" class="nav-link">Produtos ({{ totalProducts }})</router-link>
            </li>
            <li>
                <router-link :to="{name: 'products.reports'}" class="nav-link">Relatórios</router-link>
            </li>
            <li>
                            <a href="#" class="nav-link">{{ me.name }} (<a href="#" @click.prevent="logout">Sair</a>)</a>                
            </li>
        </ul>
        <div class="container">
            <router-view></router-view>
        </div>
    </div> -->
</template>

<script>
import {
    SidebarMenu
} from 'vue-sidebar-menu'
import {
    FadeTransition
} from 'vue2-transitions'

export default {
    components: {
        SidebarMenu,
        FadeTransition
    },

    data() {
        return {
            menu: [

                // Titulo do menu
                {
                    header: true,
                    title: 'Titulo Menu',
                    hiddenOnCollapse: true
                },

                // Dashboard
                {
                    href: {
                        name: 'admin.dashboard'
                    },
                    title: 'Home',
                    icon: {
                        element: 'span',
                        class: 'fas fa-home',
                    },
                    badge: {
                        text: "30",
                        class: 'vsm--badge_default'
                    },
                },

                // Categorias
                {
                    href: {
                        name: 'admin.categories'
                    },
                    title: 'Categorias',
                    icon: {
                        element: 'span',
                        class: 'fa fa-user',
                    },
                    badge: {
                        text: '30',
                        class: 'vsm--badge_default'
                    },
                },

                // Produtos
                {
                    href: {
                        name: 'admin.products'
                    },
                    title: 'Produtos',
                    icon: {
                        element: 'span',
                        class: 'fa fa-user',
                    },
                    badge: {
                        text: "30",
                        class: 'vsm--badge_default'
                    },
                },

                // Relatórios
                {
                    href: {
                        name: 'products.reports'
                    },
                    title: 'Relatórios',
                    icon: {
                        element: 'span',
                        class: 'fa fa-user',
                    },
                    badge: {
                        text: "30",
                        class: 'vsm--badge_default'
                    },
                },

                // logout
                {
                    href: '#',
                    title: 'Sair',
                    icon: {
                        element: 'i',
                        class: 'fas fa-sign-out-alt',
                    },
                    badge: {
                        text: "30",
                        class: 'vsm--badge_default'
                    },
                },
            ],

            // Sidebar theme (available themes: 'white-theme')
            theme: '',

            // SiteBar collapsed ( true para ficar colapsado e false para ficar expandido)
            collapsed: true,
        }
    },

    computed: {
        totalCategories() {
            return this.$store.state.categories.items.data.data
        },

        me() {
            return this.$store.state.auth.me
        },

        totalProducts() {
            return this.$store.state.products.items.total
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('logout')

            this.$router.push({
                name: 'login'
            })
        },

        onToggleCollapse(collapsed) {
            this.collapsed = collapsed            
        },

        onItemClick(event, item) {
            if (!this.collapsed) this.onToggleCollapse(true)

            if (item.title == 'Sair') this.logout()
        }
    },
}
</script>

<style scoped>

</style>
