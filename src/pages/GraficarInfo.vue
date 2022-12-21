<script setup>
import GraphIndex from 'src/components/GraphIndex.vue';

const dataGraph = {
  chartData: {
    labels: ['1', '2', '3'],
    datasets: [
      {
        label: 'Set 1',
        backgroundColor: '#FFA400',
        data: [400, 20, 12]
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
