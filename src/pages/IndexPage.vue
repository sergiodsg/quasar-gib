<script setup>
import GraphIndex from 'src/components/GraphIndex.vue';

const dataGraph = {
  chartData: {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#B2DDF7',
        data: [40, 20, 12]
      }
    ]
  },
  chartOptions: {
    responsive: true
  }
}
</script>

<template>
  <q-page class="flex flex-center">
    <GraphIndex :data="dataGraph.chartData" :options="dataGraph.chartOptions" />
  </q-page>
</template>
