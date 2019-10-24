<template>
<div>
    <form class="form" @submit.prevent="onSubmit">
        <div :class="['form-group', {'has-error' : errors.image}]">
            <div v-if="errors.image">{{ errors.image[0] }}</div>
            <div v-if="imagePreview" class="text-center">
                <img :src="imagePreview" class="image-preview">
                <button @click.prevent="removePreviewImage" class="btn btn-danger">Remover</button>
            </div>
            <div v-else>
                <input type="file" class="form-control" @change="onFileChange">
            </div>
        </div>

        <!-- Se existir o atributo errors, então adiciona a classe-->
        <div :class="['form-group', {'has-error' : errors.name}]">
            <div v-if="errors.name">{{ errors.name[0] }}</div>
            <input type="text" v-model="product.name" class="form-control" placeholder="Nome do Produto">
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
            type: Object
        }
    },
    data() {
        return {
            errors: {},
            upload: null,
            imagePreview: null,
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
            let msgSuccess = this.update ? 'Sucesso ao atualizar!' : 'Sucesso ao cadastrar!'

            const formData = new FormData()
            console.log(this.upload)
            if (this.upload != null) {
                formData.append('image', this.upload)
            }

            formData.append('id', this.product.id)
            formData.append('name', this.product.name)
            formData.append('description', this.product.description)
            formData.append('category_id', this.product.category_id)

            const response = await this.$store.dispatch(action, formData)

            if (response.data) {

                this.$snotify.success(msgSuccess)

                this.reset()

                this.$emit('success')
            } else {

                this.$snotify.error('Algo Errado', 'Erro')

                this.errors = response
            }
        },

        reset() {
            this.errors = {}

            this.imagePreview = null
            this.upload = null
        },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length)
                return

            this.upload = files[0]

            this.previewImage(files[0])
        },

        previewImage(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }
            reader.readAsDataURL(file)
        },

        removePreviewImage() {
            this.imagePreview = null
            this.upload = null
        }
    }
}
</script>

<style scoped>
    .image-preview { max-width: 60px; }
</style>
