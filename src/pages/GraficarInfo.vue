<script setup>
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

let productos_por_banco = {};
let datos = ref({});

const getData = async () => {
  const productosCol = collection(db, "productos");
  const productosSnapshot = await getDocs(productosCol);
  const productosLista = productosSnapshot.docs.map((doc) => doc.data());
  for (let i = 0; i < productosLista.length; i++) {
    if (productos_por_banco[productosLista[i].nombreBanco] == undefined) {
      productos_por_banco[productosLista[i].nombreBanco] = 1;
    } else {
      productos_por_banco[productosLista[i].nombreBanco] =
        productos_por_banco[productosLista[i].nombreBanco] + 1;
    }
  }
  console.log(productos_por_banco);
  datos.value = productos_por_banco;
  return datos;
}

getData();
</script>

<template>
  <q-page class="flex flex-center">
    <column-chart :data="datos" :colors="['#F79420']"></column-chart>
  </q-page>
</template>
