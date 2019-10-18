<template>
<div>
    <form class="form" @submit.prevent="onSubmit">
        <!-- Se existir o atributo errors, então adiciona a classe-->
        <div :class="['form-group', {'has-error' : errors.name}]">
            <div v-if="errors.name">{{ errors.name[0] }}</div>
            <input type="text" v-model="product.name" class="form-control" placeholder="Nome da Categoria">
        </div>

        <div :class="['form-group', {'has-error' : errors.description}]">
            <div v-if="errors.description">{{ errors.description[0] }}</div>
            <textarea v-model="product.description" cols="30" rows="10" class="form-control" placeholder="Descrição do produto"></textarea>
        </div>

        <div :class="['form-group', {'has-error' : errors.category_id}]">
            <div v-if="errors.category_id">{{ errors.category_id[0] }}</div>
            <select class="form-control" v-model="product.category_id">
                <option value="">Selecione a Categoria</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-primary">Enviar</button>
        </div>
    </form>
</div>
</template>

<script>
export default {
    props: {
        update: {
            require: false,
            type: Boolean,
            default: false
        },
        product: {
            require: false,
            type: Object,
            default: () => {
                return {
                    id: '',
                    name: '',
                    description: '',
                    //image: '',
                    category_id: '',
                }
            }
        }
    },
    data() {
        return {
            errors: {}
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories.items.data.data
        }
    },
    methods: {
        async onSubmit() {
            let action = this.update ? 'updateProduct' : 'storeProduct'
            let msgSuccess =  this.update ? 'Sucesso ao atualizar!' : 'Sucesso ao cadastrar!'
console.log(action)
            const response = await this.$store.dispatch(action, this.product)

            if (response.data) {
                console.log('teste data ' + JSON.stringify(response.data))

                this.$snotify.success(msgSuccess)

                this.reset()

                this.$emit('success')
            } else {
                console.log('teste data ' + JSON.stringify(response))

                this.$snotify.error('Algo Errado', 'Erro')

                this.errors = response
            }
        },

        reset() {
            this.errors = {}

            this.product = {
                id: '',
                name: '',
                description: '',
                //image: '',
                category_id: '',
            }
        }
    }
}
</script>
