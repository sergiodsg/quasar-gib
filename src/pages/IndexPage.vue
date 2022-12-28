<script setup>
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

let puertos_por_banco = {};
let datos = ref({});

const getData = async () => {
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
  datos.value = puertos_por_banco;
  return datos;
}

getData();
</script>

<template>
  <q-page class="flex flex-center">
    <column-chart :data="datos" :colors="['#F79420']"></column-chart>
  </q-page>
</template>
