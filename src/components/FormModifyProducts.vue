<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { collection, query, where, getDocs, runTransaction, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const $q = useQuasar();

const abaMod = ref(null);
const puertoMod = ref(null);
const aba = ref(null);
const nombreBanco = ref(null);
const ambiente = ref(null);
const switchProducto = ref(null);
const producto = ref(null);
const puerto = ref(null);
const direccion_ip_banco = ref(null);
const direccion_ip_empresa = ref(null);

const onSubmit = () => {
  modificarProducto(abaMod, puertoMod);
}

const modificarProducto = async (abaMod, puertoMod) => {
  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("aba", "==", abaMod.value), where("puerto", "==", puertoMod.value));
  const querySnapshot = await getDocs(q);
  const idSelected = querySnapshot.docs.map((doc) => doc.id);
  for (let i = 0; i < idSelected.length; i++) {
    //const sfDocRef = doc(db, "banks", idSelected[i]);
    try {
      await runTransaction(db, async (transaction) => {
        // const sfDoc = await transaction.get(sfDocRef);
        // if (!sfDoc.exists()) {
        //   throw "Document does not exist!";
        // }

        await setDoc(doc(db, "productos", idSelected[i]), {
          aba: aba.value,
          nombreBanco: nombreBanco.value,
          ambiente: ambiente.value,
          switchProducto: switchProducto.value,
          producto: producto.value,
          puerto: puerto.value,
          direccion_ip_banco: direccion_ip_banco.value,
          direccion_ip_empresa: direccion_ip_empresa.value
        });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }
}


const onReset = () => {
  abaMod.value = null;
  puertoMod.value = null;
  aba.value = null;
  nombreBanco.value = null;
  ambiente.value = null;
  switchProducto.value = null;
  producto.value = null;
  puerto.value = null;
  direccion_ip_banco.value = null;
  direccion_ip_empresa.value = null;
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 1000px">
    <h5>Modificar producto existente</h5>
    <q-form @submit="onSubmit" @reset="onReset">
      <p>Aba y puerto del producto a modificar</p>
      <div class="row col-4 col-sm-4 col-md-6 q-gutter-sm justify-center">
        <q-input filled v-model="abaMod" label="Aba del producto a modificar" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="puertoMod" label="Puerto del producto a modificar" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <p>Nueva información</p>
      <div class="row col-4 col-sm-4 col-md-6 q-gutter-sm justify-center">
        <q-input filled v-model="aba" label="Nuevo Aba" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="nombreBanco" label="Nuevo nombre del banco" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="ambiente" label="Nuevo ambiente" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="switchProducto" label="Nuevo switch" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <div class="row col-4 col-sm-4 col-md-6 q-gutter-sm justify-center">
        <q-input filled v-model="producto" label="Nuevo producto" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="puerto" label="Nuevo puerto" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="direccion_ip_banco" label="Nueva dirección IP del banco" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="direccion_ip_empresa" label="Nueva dirección IP de la empresa" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <div class="row q-gutter-sm justify-center">
        <q-btn label="Modificar" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>
