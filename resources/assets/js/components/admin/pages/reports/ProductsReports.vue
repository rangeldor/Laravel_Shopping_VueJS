<template>
<div>
    <h1>Relatório de produtos</h1>
    <hr>
    <select class="form-control" v-model="year" @change="charts">
        <option :value="i" v-for="i in years" :key="i">{{ i }}</option>
    </select>

    <line-chart :labels="labels" :datasets="datasets"></line-chart>
</div>
</template>

<script>
import LineChart from './charts/LineChart'

export default {
    components: {
        LineChart
    },
    computed: {
        years() {
            let year = new Date().getFullYear()
            let startYear = year - 10

            let years = []
            let j = 0

            for (let i = year; i >= startYear; i--) {
                years[j] = i

                j++
            }

            return years
        }
    },
    mounted() {
        this.charts()
    },
    data() {
        return {
            year: new Date().getFullYear(),
            labels: [],
            datasets: [{
                label: 'Real mês',
                backgroundColor: 'transparent',
                borderColor: '#000',
                data: []
            }]
        }
    },
    methods: {
        async charts() {
            try {
                const response = await this.$store.dispatch('reportsProducts', {
                    year: this.year
                })

                if (response.status == 200) {
                    this.labels = response.data.labels
                    this.datasets[0].data = response.data.datasets
                }
            } catch (error) {
                this.$snotify.error('Erro ao atualizar gráficos')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
