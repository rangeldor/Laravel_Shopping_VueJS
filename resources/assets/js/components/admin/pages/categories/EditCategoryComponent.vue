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
    async created() {
        try {
            const response = await this.$store.dispatch('loadCategory', this.id)
            this.category = response.data
        } catch (errors) {
            console.log(error)
        }   
    },
    data () {
        return {
            category: {

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