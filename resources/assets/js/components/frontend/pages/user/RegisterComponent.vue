<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    Cadastrar-se
                </div>
                <div class="card-body">
                    <form action="" class="form" @submit.prevent="register">
                        <user-form :user="formData" :errors="errors"></user-form>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import UserForm from './UserForm'

export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            },
            errors: {}
        }
    },

    methods: {
        async register() {
            const response = await this.$store.dispatch('register', this.formData)

            if (response.status == 200) {
                this.$router.push({
                    name: 'admin.dashboard'
                })

                this.$snotify.success('Sucesso ao cadastrar!')
            } else {
                this.errors = response.errors
            }
        }
    },

    components: {
        UserForm
    }
}
</script>

<style scope>
.has-error { color: red}
.has-error input { border: 1px solid red; }
</style>
