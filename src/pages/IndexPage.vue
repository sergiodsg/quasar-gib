<script setup>
import { ref, watchEffect } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import GraphIndex from "src/components/GraphIndex.vue";

let puertos_por_banco = {};
let datos = [];

watchEffect(async () => {
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
  console.log(puertos_por_banco);
  const labels = Object.keys(puertos_por_banco);
  const values = Object.values(puertos_por_banco);
  for (let i = 0; i < values.length; i++) {
    datos.push([labels[i], values[i]]);
  }
  console.log(datos);
})
</script>

<template>
  <q-page class="flex flex-center">
    <column-chart :data="datos"></column-chart>
  </q-page>
</template>
