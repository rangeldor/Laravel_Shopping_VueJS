<template>
    <div>
        <h1>Adicionar nova categoria</h1>

        <form-cat></form-cat>
    </div>
</template>

<script>
import FormCategoryComponent from './partials/FormCategoryComponent'

export default {
    data() {
        return {
            name: ''
        }
    },
    components: {
        formCat : FormCategoryComponent
    }
}
</script>

<style scoped>

</style>