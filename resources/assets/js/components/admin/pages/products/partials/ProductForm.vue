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
                    category_id: 1,
                }
            }
        }
    },
    data () {
        return {
            errors: {}
        }
    },
    methods: {
        async onSubmit () {
            const response = await this.$store.dispatch('storeProduct', this.product)

            if (response.data) {
                console.log('teste data ' + JSON.stringify(response.data))

                this.$snotify.success('Sucesso ao cadastrar')
            } else {
                console.log('teste data ' + JSON.stringify(response))

                this.$snotify.error('Algo Errado', 'Erro')

                this.errors = response
            }
        }
    }
}
</script>
