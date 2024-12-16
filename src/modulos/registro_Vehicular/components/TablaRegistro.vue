<template>
  <q-table
    :rows="list_Vehiculos"
    :columns="columnas"
    :filter="filter"
    row-key="name"
    v-model:pagination="pagination"
    no-data-label="No hay registros"
    rows-per-page-label="Registros por página"
    color="pink"
  >
    <template v-slot:top>
      <q-space />
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Buscar"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <div v-if="col.name === 'id'">
            <q-btn
              v-if="modulo == null ? false : modulo.actualizar"
              flat
              round
              color="purple-ieen"
              icon="edit"
              @click="editar(col.value)"
            >
              <q-tooltip>Editar vehículo</q-tooltip>
            </q-btn>
            <q-btn
              v-if="modulo == null ? false : modulo.eliminar"
              flat
              round
              color="purple-ieen"
              icon="delete"
              @click="eliminar(col.value)"
            >
              <q-tooltip>Eliminar vehículo</q-tooltip>
            </q-btn>
            <q-btn
              v-if="modulo == null ? false : modulo.leer"
              flat
              round
              color="purple-ieen"
              icon="image"
              @click="fotografia(col.value)"
            >
              <q-tooltip>Guardar/Ver fotografias</q-tooltip>
            </q-btn>
            <q-btn
              v-if="modulo == null ? false : modulo.leer"
              flat
              round
              color="purple-ieen"
              icon="directions_car"
              @click="informacion(col.value)"
            >
              <q-tooltip>Información del vehículo</q-tooltip>
            </q-btn>
            <q-btn
              v-if="modulo == null ? false : modulo.registrar"
              flat
              round
              color="purple-ieen"
              icon="zoom_in"
              @click="observaciones(col.value)"
            >
              <q-tooltip>Información del vehículo</q-tooltip>
            </q-btn>
          </div>

          <label v-else>{{ col.value }}</label>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { Column, Modulo } from './components';
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';
import { useAuthStore } from 'src/stores/auth_store';
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore) as { modulo: Ref<Modulo | null> };
const registroStore = useRegistroVehicularStore();
const router = useRouter();
const $q = useQuasar();
const { list_Vehiculos } = storeToRefs(registroStore);

const columnas: Column[] = [
  {
    name: 'vehiculo',
    align: 'center',
    label: 'Vehículo',
    field: 'vehiculo',
    sortable: true,
  },

  {
    name: 'responsable',
    align: 'center',
    label: 'Responsable del vehículo',
    field: 'responsable',
    sortable: true,
  },

  {
    name: 'bodega',
    align: 'center',
    label: 'Bodega/Estacionamiento',
    field: 'bodega',
    sortable: true,
  },

  {
    name: 'id',
    align: 'center',
    label: 'Acciones',
    field: 'id',
    sortable: true,
  },
];

const filter = ref('');
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 25,
});

const editar = async (id: number) => {
  $q.loading.show();
  registroStore.actualizarModal(true);
  await registroStore.loadAreas();
  await registroStore.loadBodegas();
  await registroStore.loadVehiculo(id);

  $q.loading.hide();
};

const informacion = async (id: number) => {
  $q.loading.show();
  await registroStore.loadVehiculo(id);
  await registroStore.loadFotografiasByVehiculo(id);
  await registroStore.loadHistorialMes(id);
  await registroStore.loadObservacionesByVehiculo(id);
  router.push({
    name: 'informacion_Vehicular',
  });
  $q.loading.hide();
};

const observaciones = async (id: number) => {
  $q.loading.show();
  await registroStore.loadVehiculo(id);
  await registroStore.loadInformacionObservacion();
  await registroStore.loadObservacionesByVehiculo(id);
  router.push({
    name: 'observaciones_Vehiculo',
  });
  $q.loading.hide();
};

const fotografia = async (id: number) => {
  $q.loading.show();
  await registroStore.loadVehiculo(id);
  await registroStore.loadFotografiasByVehiculo(id);
  registroStore.actualizarModalFotografia(true);

  $q.loading.hide();
};

const eliminar = async (id: number) => {
  $q.dialog({
    title: 'Eliminar este vehículo',
    message: '¿Está seguro de eliminar este vehículo?',
    persistent: true,
    transitionShow: 'scale',
    transitionHide: 'scale',
    ok: {
      color: 'positive',
      label: '¡Sí!, eliminar',
    },
    cancel: {
      color: 'negative',
      label: ' No Cancelar',
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await registroStore.deleteVehiculo(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: 'positive',
        message: resp.data,
      });
      registroStore.loadVehiculos();
    } else {
      $q.loading.hide();
      $q.notify({
        type: 'negative',
        message: resp.data,
      });
    }
  });
};

//-----------------------------------------------------------------------
</script>
<style scoped>
/* Estilos aquí */
</style>
