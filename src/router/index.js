import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/ListarTodos",
    name: "ListarTodos",
    meta: {
      requiresAuth: false,
      esPublica: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ConsultarTodosView.vue"),
  },
  {
    path: "/buscarXid",
    name: "buscarXid",
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BuscarXidView.vue"),
  },
  {
    path: "/actualizar",
    name: "actualizar",
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ActualizarView.vue"),
  },
  {
    path: "/actualizarParcial",
    name: "actualizarParcial",
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ActualizarParcial.vue"),
  },
  {
    path: "/guardar",
    name: "guardar",
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GuardarView.vue"),
  },
  {
    path: "/eliminar",
    name: "eliminar",
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EliminarView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*configuración del guardian */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // enviarlo a una zona de login
    console.log("ruta protegida, debe autenticarse");
    const estaAutenticado = localStorage.getItem("EstaAutenticado");
    const token = localStorage.getItem("token");
    if (!estaAutenticado) {
      console.log("No autenticado redirige al login");
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    // le dejo pasar sin redirecciones
    console.log("ruta libremente accesible");
    next();
  }
});

export default router;
