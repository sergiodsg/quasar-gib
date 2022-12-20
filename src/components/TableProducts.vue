<script setup>
const columns = [
  {
    name: 'aba',
    required: true,
    label: 'Aba',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'nombreBanco', align: 'center', label: 'Nombre de banco', field: 'nombre_banco', sortable: true },
  { name: 'ambiente', label: 'Ambiente', field: 'ambiente', sortable: true },
  { name: 'switchProducto', label: 'Switch', field: 'switch' },
  { name: 'producto', label: 'Producto', field: 'producto' },
  { name: 'puerto', label: 'Puerto', field: 'puerto' },
  { name: 'direccion_ip_banco', label: 'Dirección IP de Banco', field: 'direccion_ip_banco', sortable: true },
  { name: 'direccion_ip_empresa', label: 'Dirección IP de Empresa', field: 'direccion_ip_empresa', sortable: true }
]
</script>

<template>
  <div class="q-pa-md">
    <q-table title="Productos" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>
