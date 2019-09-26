<template>
    <div>
        <h1>Editar Categoria</h1>

        <form-cat 
            :category="category"
            :updating="true">
        </form-cat>
       
    </div>      
</template>

<script>

import FormCategoryComponent from './partials/FormCategoryComponent'

export default {
    props: {
        id: {
            // seta como true para dizer que é obrigatório passar este parâmetro como props
            require: true
        }
    },
    created() {
         this.loadCategory()
    },
    data () {
        return {
            category: {

            }
        }
    },
    methods: {
        async loadCategory () {
            try {
                const response = await this.$store.dispatch('loadCategory', this.id)
                this.category = response.data                
            } catch (errors) {               
                this.$snotify.error('Categoria não encontrada', '404')

                this.$router.push({ name: 'admin.categories' })
            }  
        }
    },
    components: {
        formCat: FormCategoryComponent
    }
}
</script>

<style scoped>

</style>