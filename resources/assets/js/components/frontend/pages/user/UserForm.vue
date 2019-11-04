<template>
<div>
    <div :class="['form-group', {'has-error':errors.name}]">
        <div v-if="errors.name">{{ errors.name[0] }}</div>
        <input type="text" v-model="user.name" class="form-control" placeholder="Nome">
    </div>
    <div :class="['form-group', {'has-error':errors.email}]">
        <div v-if="errors.email">{{ errors.email[0] }}</div>
        <input type="email" v-model="user.email" class="form-control" placeholder="E-mail">
    </div>
    <div class="form-group">
        <input type="password" v-model="user.password" class="form-control" placeholder="Senha">
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-success">Enviar</button>
    </div>
</div>
</template>

<script>
export default {

    props:  ['user', 'errors']
   
}
</script>

<style lang="scss" scoped>

</style>
