<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <!-- Se existir o atributo errors, então adiciona a classe-->
            <div :class="['form-group', {'has-error' : errors.name}]">
                <div v-if="errors.name">{{ errors.name[0] }}</div>
                <input type="text" v-model="category.name" class="form-control" placeholder="Nome da Categoria">
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
        category: {
            // seta como false para dizer que não é obrigatório passar este parâmetro como props
            require: false,
            // Qual tipo de item que vai receber
            type: Object|Array,
            default: () => {
                return {
                    id: '',
                    name: ''
                }
            }            
        },
        updating: {
            require: false,
            type: Boolean,
            default: false,
        }
    },
    data () {
        return {
            errors: {}
        }
    },
    methods: {
        async onSubmit() {

            const action = this.updating ? 'updateCategory' : 'storeCategory'

            const response = await this.$store.dispatch(action, this.category)
                      
            if(response.data) {
                console.log('teste data ' + JSON.stringify(response.data))

                this.$snotify.success('Sucesso ao cadastrar')

                this.$router.push({ name: 'admin.categories'})
            }else {
                 console.log('teste data ' + JSON.stringify(response))

                 this.$snotify.error('Algo errado')

                 this.errors = response
            }

        }
    }
}
</script>

<style scope>
.has-error { color: red}
.has-error input { border: 1px solid red; }
</style>