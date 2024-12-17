<template>
  <q-table
    :rows="list_Vehiculos_By_Area"
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
              v-if="modulo == null ? false : modulo.registrar"
              flat
              round
              color="purple-ieen"
              icon="edit_square"
              @click="observaciones(col.value)"
            >
              <q-tooltip>Registrar Observaciones</q-tooltip>
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
const { list_Vehiculos_By_Area } = storeToRefs(registroStore);

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
    label: 'Responsable del véhículo',
    field: 'responsable',
    sortable: true,
  },
  {
    name: 'bodega',
    align: 'center',
    label: 'Bodega / Estacionamiento',
    field: 'bodega',
    sortable: true,
  },
  {
    name: 'id',
    align: 'center',
    label: 'Opciones',
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

const observaciones = async (id: number) => {
  $q.loading.show();
  await registroStore.loadVehiculo(id);
  await registroStore.loadInformacionObservacion();
  await registroStore.loadObservacionesByVehiculo(id);
  router.push({
    name: 'registro_Observacion',
  });
  $q.loading.hide();
};

//-----------------------------------------------------------------------
</script>
<style scoped>
/* Estilos aquí */
</style>
