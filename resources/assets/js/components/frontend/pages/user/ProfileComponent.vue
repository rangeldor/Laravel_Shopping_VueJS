<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    Atualizar Perfil
                </div>
                <div class="card-body">
                    <form action="" class="form" @submit.prevent="updateProfile">
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

    computed: {
        formData() {
            return this.$store.state.auth.me
        },
    },

    data() {
        return {
            errors: {}
        }
    },

    methods: {
        async updateProfile() {
            const response = await this.$store.dispatch('update', this.formData)

            if (response.status == 200) {
                this.$router.push({
                    name: 'admin.dashboard'
                })

                this.$snotify.success('Atualizado com sucesso!')
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

<style>
.has-error {
    color: red
}

.has-error input {
    border: 1px solid red;
}
</style>
