<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const $q = useQuasar();

const aba = ref(null);
const nombreBanco = ref(null);
const ambiente = ref(null);
const switchProducto = ref(null);
const producto = ref(null);
const puerto = ref(null);
const direccion_ip_banco = ref(null);
const direccion_ip_empresa = ref(null);

const onSubmit = () => {
  agregarProducto();
}

const agregarProducto = () => {
  console.log(aba.value);
  addDoc(collection(db, "productos"), {
    aba: aba.value,
    nombreBanco: nombreBanco.value,
    ambiente: ambiente.value,
    switchProducto: switchProducto.value,
    producto: producto.value,
    puerto: puerto.value,
    direccion_ip_banco: direccion_ip_banco.value,
    direccion_ip_empresa: direccion_ip_empresa.value
  })
    .then(() => {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Se agregó el producto exitosamente'
      });
    })
    .catch((e) => {
      console.log(e);

      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'No se pudieron registrar los datos'
      });
    });
}

const onReset = () => {
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
    <h5>Agregar nuevo producto</h5>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="row col-4 col-sm-4 col-md-6 q-gutter-sm justify-center">
        <q-input filled v-model="aba" label="Aba del producto" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="nombreBanco" label="Nombre del banco" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="ambiente" label="Ambiente" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="switchProducto" label="Switch del producto" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <div class="row col-4 col-sm-4 col-md-6 q-gutter-sm justify-center">
        <q-input filled v-model="producto" label="Producto" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="puerto" label="Puerto a utilizar" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="direccion_ip_banco" label="Dirección IP del banco" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />

        <q-input filled v-model="direccion_ip_empresa" label="Dirección IP de la empresa" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <div class="row q-gutter-sm justify-center">
        <q-btn label="Agregar" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>
