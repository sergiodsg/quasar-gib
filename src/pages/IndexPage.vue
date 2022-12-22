<script setup>
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import GraphIndex from "src/components/GraphIndex.vue";

let puertos_por_banco = {};
let bancos = [];
let puertos = [];

const obtenerProductos = async () => {
  const productosCol = collection(db, "productos");
  const productosSnapshot = await getDocs(productosCol);
  const productosLista = productosSnapshot.docs.map((doc) => doc.data());
  for (let i = 0; i < productosLista.length; i++) {
    if (puertos_por_banco[productosLista[i].nombreBanco] == undefined) {
      puertos_por_banco[productosLista[i].nombreBanco] = 1;
    } else {
      puertos_por_banco[productosLista[i].nombreBanco] =
        puertos_por_banco[productosLista[i].nombreBanco] + 1;
    }
  }
  bancos = Object.keys(puertos_por_banco);
  puertos = Object.values(puertos_por_banco);
};

obtenerProductos();

const dataGraph = {
  chartData: {
    labels: Object.keys(puertos_por_banco),
    datasets: [
      {
        label: "",
        backgroundColor: "#B2DDF7",
        data: Object.values(puertos_por_banco),
      },
    ],
  },
  chartOptions: {
    responsive: true,
  },
};

console.log(puertos_por_banco);
console.log(bancos);
console.log(puertos);
console.log(Object.getOwnPropertyNames(puertos_por_banco));
</script>

<template>
  <q-page class="flex flex-center">
    <GraphIndex :data="dataGraph.chartData" :options="dataGraph.chartOptions" />
  </q-page>
</template>
