import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () =>
          import('../modulos/disponibilidad/pages/IndexPage.vue'),
      },
      {
        path: '/ver_Disponibilidad',
        name: 'ver_Disponibilidad',
        component: () =>
          import('../modulos/disponibilidad/pages/IndexPage.vue'),
      },
      {
        path: '/registro_Vehicular',
        name: 'registro_Vehicular',
        component: () =>
          import('../modulos/registro_Vehicular/pages/IndexPage.vue'),
      },
      {
        path: '/informacion_Vehicular',
        name: 'informacion_Vehicular',
        component: () =>
          import('../modulos/registro_Vehicular/pages/KardexPage.vue'),
      },
      {
        path: '/observaciones_Vehiculo',
        name: 'observaciones_Vehiculo',
        component: () =>
          import('../modulos/registro_Vehicular/pages/ObservacionesPage.vue'),
      },
      {
        path: '/registro_Observacion',
        name: 'registro_Observacion',
        component: () =>
          import(
            '../modulos/registro_Vehicular/components/FormularioObservaciones.vue'
          ),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
