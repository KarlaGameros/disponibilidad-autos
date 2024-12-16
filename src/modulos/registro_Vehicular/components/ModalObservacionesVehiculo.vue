<template>
  <q-card bordered>
    <q-item class="bg-purple text-white">
      <q-item-section>
        <q-item-label class="text-bold text-h6"
          >Observaciones del vehículo</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-separator />
    <q-table
      :rows="list_Historial_Oservaciones"
      :columns="columns"
      :filter="filter"
      v-model:pagination="pagination"
      no-data-label="No hay registros"
      rows-per-page-label="Registros por página"
      class="my-sticky-last-column-table"
      color="pink"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'atendido'">
              <label v-if="col.value == false">Sin atender</label>
              <label v-else-if="col.value == true">Atendido</label>
            </div>
            <div v-else-if="col.name === 'id'">
              <q-btn
                v-if="props.row.atendido == false && modulo?.registrar == true"
                flat
                round
                color="purple-ieen"
                icon="check"
                @click="atendido(col.value)"
              >
                <q-tooltip>Atender</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="purple-ieen"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
              >
                <q-tooltip>Ver detalle</q-tooltip>
              </q-btn>
            </div>
            <label v-else>{{ col.value }}</label>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <strong>Observación </strong>
              {{ props.row.observacion }}
              <br />
              <strong>Evidencia fotografica </strong>

              <br />
              <div class="q-col-gutter-md row items-start">
                <div class="col-4">
                  <q-img :src="props.row.foto1_URL" :ratio="16 / 9" />
                </div>
                <div class="col-4">
                  <q-img :src="props.row.foto2_URL" :ratio="16 / 9" />
                </div>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { Column } from './components';
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';
import { Modulo } from '../components/components';
const registroStore = useRegistroVehicularStore();
const $q = useQuasar();
const { list_Historial_Oservaciones, observaciones } =
  storeToRefs(registroStore);
import { useAuthStore } from '../../../stores/auth_store';
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore) as { modulo: Ref<Modulo | null> };
/*onMounted(() => {
  cargarInformacion();
});*/
//-------------------------------------------------------

const columns: Column[] = [
  {
    name: 'vehiculo',
    align: 'center',
    label: 'Vehículo',
    field: 'vehiculo',
    sortable: true,
  },
  {
    name: 'empleado',
    align: 'center',
    label: 'Empleado que registro',
    field: 'empleado',
    sortable: true,
  },

  {
    name: 'asunto',
    align: 'center',
    label: 'Asunto',
    field: 'asunto',
    sortable: true,
  },
  {
    name: 'fecha_Creacion',
    align: 'center',
    label: 'Fecha de registro',
    field: 'fecha_Creacion',
    sortable: true,
  },
  {
    name: 'atendido',
    align: 'center',
    label: '¿Atendido?',
    field: 'atendido',
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

const atendido = async (id: number) => {
  $q.dialog({
    title: 'Atender observación',
    message: '¿Está seguro que se atendio la observación?',
    persistent: true,
    transitionShow: 'scale',
    transitionHide: 'scale',
    ok: {
      color: 'positive',
      label: '¡Sí!, Atendido',
    },
    cancel: {
      color: 'negative',
      label: ' No, Cancelar',
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await registroStore.atencionObservacion(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: 'positive',
        message: resp.data,
      });
      await registroStore.loadObservacionesByVehiculo(
        observaciones.value.vehiculo_Id
      );
    } else {
      $q.loading.hide();
      $q.notify({
        type: 'negative',
        message: resp.data,
      });
    }
  });
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
