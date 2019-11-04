<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body">
                    <form action="" class="form" @submit.prevent="login">
                        <div class="form-group">
                            <input type="email" v-model="formData.email" class="form-control" placeholder="E-mail">
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="formData.password" class="form-control" placeholder="Senha">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-success">Acessar</button>
                            <router-link :to="{name: 'register'}">Não tem cadastro? Registre-se!</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        async login() {
            const response = await this.$store.dispatch('login', this.formData)
            
            if ( response.status == 200) {
                this.$router.push({
                    name: 'admin.dashboard'
                })
            } else {
                this.$snotify.error('Dados inválidos', 'Falha ao acessar')
            }
        }
    },
}
</script>

<style scoped>

</style>
