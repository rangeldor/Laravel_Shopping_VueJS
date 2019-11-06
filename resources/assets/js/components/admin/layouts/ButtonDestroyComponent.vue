<template>
    <a href="#" @click.prevent="confirmDelete(item)" class="btn btn-danger">Deletar</a>
</template>

<script>
export default {
    props: {
        item: {
            require: true,
            type: Object,
        },
    },
    methods: {
        confirmDelete (item) {
            this.$snotify.error(`Deseja realmente deletar o registro ${item.name}`, 'Confirma?', item.name,{
                timout: 10000,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                buttons: [
                    {text: 'Nao', action: (value) => {this.$snotify.remove(value.id)}},
                    {text: 'Sim', action: (value) => {this.$emit('destroy', item.id), this.$snotify.remove(value.id)}}
                ]
            })
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
