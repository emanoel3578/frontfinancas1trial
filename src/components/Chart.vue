<template>
    <div style="height:auto;width:400px;">
        <vue3-chart-js
            :id="doughnutChart.id"
            :type="doughnutChart.type"
            :data="doughnutChart.data"
            @before-render="beforeRenderLogic"
        ></vue3-chart-js>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
    name: 'Chart',
    components: {
    Vue3ChartJs,
  },
  setup () {
    const doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        labels: ['Compra de gado', 'Contratos', 'Entrada de dinheiro', 'Vendas Gerais'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: [20, 100, 150, 30]
          }
        ]
      }
    }

    return {
      doughnutChart,
    }
  },
}

</script>