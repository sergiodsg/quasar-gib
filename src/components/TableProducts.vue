<script setup>
import { ref, provide } from 'vue';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const columns = [
  {
    name: 'aba',
    required: true,
    label: 'Aba',
    align: 'left',
    field: 'aba',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'nombreBanco', align: 'center', label: 'Nombre de banco', field: 'nombreBanco', sortable: true },
  { name: 'ambiente', label: 'Ambiente', field: 'ambiente', sortable: true },
  { name: 'switchProducto', label: 'Switch', field: 'switchProducto' },
  { name: 'producto', label: 'Producto', field: 'producto' },
  { name: 'puerto', label: 'Puerto', field: 'puerto' },
  { name: 'direccion_ip_banco', label: 'Dirección IP de Banco', field: 'direccion_ip_banco', sortable: true },
  { name: 'direccion_ip_empresa', label: 'Dirección IP de Empresa', field: 'direccion_ip_empresa', sortable: true }
]

const rows = ref([]);

const is_loading = ref(true);

const aba = ref(null);
const nombreBanco = ref(null);
const ambiente = ref(null);
const switchProducto = ref(null);
const producto = ref(null);
const puerto = ref(null);
const direccion_ip_banco = ref(null);
const direccion_ip_empresa = ref(null);

const obtenerProductos = async () => {
  const productosCol = collection(db, "productos");
  const productosSnapshot = await getDocs(productosCol);
  const productosLista = productosSnapshot.docs.map((doc) => doc.data());
  productosLista.forEach(item => {
    const productos_data_table = {
      aba: item.aba,
      nombreBanco: item.nombreBanco,
      ambiente: item.ambiente,
      switchProducto: item.switchProducto,
      producto: item.producto,
      puerto: item.puerto,
      direccion_ip_banco: item.direccion_ip_banco,
      direccion_ip_empresa: item.direccion_ip_empresa
    };
    rows.value.push(productos_data_table);
  });
  is_loading.value = false;
}

obtenerProductos();
</script>

<template>
  <div class="q-pa-md">
    <q-table title="Productos" :rows="rows" :columns="columns" :row-key="aba" :loading="is_loading">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>
