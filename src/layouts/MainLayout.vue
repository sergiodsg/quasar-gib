<script setup>
import { ref } from 'vue';
import ItemsDrawer from 'src/components/ItemsDrawer.vue';

const leftDrawerOpen = ref(false);

const links = [
  {
    title: "Mostrar",
    caption: "Visualiza todos los productos y su información",
    link: "/mostrar",
    icon: "fa-solid fa-file-alt"
  },
  {
    title: "Agregar",
    caption: "Añade nuevos productos y registra sus datos",
    link: "/agregar",
    icon: "fa-solid fa-file-import"
  },
  {
    title: "Eliminar",
    caption: "Quita productos de la lista",
    link: "/eliminar",
    icon: "fa-solid fa-file-excel"
  },
  {
    title: "Modificar",
    caption: "Modifica la información de los productos",
    link: "/modificar",
    icon: "fa-solid fa-file-signature"
  },
  {
    title: "Gráficos",
    caption: "Renderiza graficos adicionales representando la información de los productos",
    link: "/graficos",
    icon: "fa-solid fa-chart-pie"
  }
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>

<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-orange-10 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-img src="src\assets\logo-app.png" spinner-color="white" style="height: 75px; max-width: 150px" />


        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <ItemsDrawer v-for="item in links" :key="item.title" v-bind="item" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-6 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="footer">Developed by Sergio Da Silva (2022)</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
