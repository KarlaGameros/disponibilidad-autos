<template>
  <q-card bordered>
    <q-item class="bg-purple text-white">
      <q-item-section>
        <q-item-label class="text-bold text-h6"
          >Historico de solicitudes</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-separator />
    <q-table
      :rows="list_Historial_Filtro"
      :columns="columns"
      :filter="filter"
      row-key="name"
      v-model:pagination="pagination"
      no-data-label="No hay registros"
      rows-per-page-label="Registros por página"
      class="my-sticky-last-column-table"
      color="pink"
    >
      <template v-slot:top-left>
        <q-select
          class="q-mr-lg"
          v-model="anioFiltro"
          style="width: 250px"
          label="Año"
          :options="anios"
          @update:model-value="filtroHistorico()"
        >
        </q-select>
        <q-space />
        <q-select
          v-model="mesFiltro"
          :options="meses"
          style="width: 250px"
          label="Mes"
          @update:model-value="filtroHistorico()"
        >
        </q-select>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <label>{{ col.value }}</label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { Column } from './components';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';
const registroStore = useRegistroVehicularStore();
const $q = useQuasar();
const { list_Historial_Filtro } = storeToRefs(registroStore);
const mesFiltro = ref();
const anioFiltro = ref();
const meses = ref([
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 },
]);
const anios = ref<number[]>([]);

onMounted(() => {
  cargarInformacion();
});
//-------------------------------------------------------

const columns: Column[] = [
  {
    name: 'tipo',
    align: 'center',
    label: 'Tipo de solicitud',
    field: 'tipo',
    sortable: true,
  },
  {
    name: 'folio',
    align: 'center',
    label: 'Folio',
    field: 'folio',
    sortable: true,
  },

  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: 'fecha',
    sortable: true,
  },
  {
    name: 'solicitante',
    align: 'center',
    label: 'Solicitante',
    field: 'solicitante',
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

const cargarInformacion = async () => {
  $q.loading.show();
  const fechaActual = new Date();
  const anioActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;

  const mesFiltrado = meses.value.find((x) => x.value == mesActual);
  mesFiltro.value = mesFiltrado;
  anioFiltro.value = anioActual;

  for (let i = anioActual; i >= 2023; i--) {
    anios.value.push(i);
  }

  $q.loading.hide();
};

const filtroHistorico = async () => {
  $q.loading.show();
  await registroStore.loadFiltroHistorico(
    anioFiltro.value,
    mesFiltro.value.value
  );
  $q.loading.hide();
};
</script>

<style lang="sass">
.my-sticky-last-column-table

  thead tr:last-child th:last-child
    background-color: #fff

  td:last-child
    background-color: #fff

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
