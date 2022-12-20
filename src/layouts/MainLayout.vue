<script setup>
import { ref } from 'vue';
import ItemsDrawer from 'src/components/ItemsDrawer.vue';

const leftDrawerOpen = ref(false);

const links = [
  {
    title: "Mostrar",
    caption: "Visualiza todos los productos y su información",
    link: "/mostrar",
    icon: "article"
  },
  {
    title: "Agregar",
    caption: "Añade nuevos productos y registra sus datos",
    link: "/agregar",
    icon: "add_circle_outline"
  },
  {
    title: "Eliminar",
    caption: "Quita productos de la lista",
    link: "/eliminar",
    icon: "delete_sweep"
  },
  {
    title: "Modificar",
    caption: "Modifica la información de los productos",
    link: "/modificar",
    icon: "create"
  },
  {
    title: "Gráficos",
    caption: "Renderiza graficos adicionales",
    link: "/graficos",
    icon: "show_chart"
  }
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>

<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-deep-orange-6 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" size="lg" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-btn class="container-logo-app row justify-center" flat to="/">
            <q-img src="src\assets\logo-app.png" class="logo-app" spinner-color="white" />
          </q-btn>
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
