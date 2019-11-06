import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      require: true,
      type: Array
    },
    datasets: {
      require: true,
      type: Array
    }
  },
  methods: {
    charts() {
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets,
      }, {responsive: true, maintainAspectRatio: false})
    }
  },
  mounted () {
    this.charts()
  },
  watch: {
    labels() {
      this.charts()
    }
  }
}