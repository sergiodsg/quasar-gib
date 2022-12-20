const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/mostrar", component: () => import("pages/MostrarInfo.vue") },
      { path: "/agregar", component: () => import("pages/AgregarInfo.vue") },
      { path: "/eliminar", component: () => import("pages/EliminarInfo.vue") },
      {
        path: "/modificar",
        component: () => import("pages/ModificarInfo.vue"),
      },
      { path: "/graficos", component: () => import("pages/GraficarInfo.vue") },
      { path: "/about", component: () => import("pages/AboutApp.vue") },
      { path: "/login", component: () => import("pages/IndexPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
