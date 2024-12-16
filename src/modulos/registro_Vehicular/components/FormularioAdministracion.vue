<template>
  <div class="row q-col-gutter-sm">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.catalago"
        label="Catalogo que pertenece"
        readonly
        autogrow
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-select
        v-model="bodegaId"
        label="Bodega o Estacionamiento de resguardo del véhiculo"
        autogrow
        :options="list_Bodegas"
        :rules="[(val) => !!val || 'El lugar de resguardo es requerido']"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-select
        v-model="areaId"
        label="Área de resguardo del véhiculo"
        autogrow
        :options="list_Area"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-select
        v-model="responsableId"
        label="Personal a cargo del véhiculo"
        autogrow
        :options="list_Responsables"
        :disable="areaId == null"
        :rules="[(val) => !!val || 'El responsable es requerido']"
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.numero_Placas"
        label="Número de placas"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.numero_Institucional"
        label="Número institucional"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        label="Fecha de compra"
        v-model="vehiculo.fecha_Compra"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                v-model="vehiculo.fecha_Compra"
                :locale="myLocale"
                color="purple"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Ok" color="purple" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.importe"
        label="Importe del véhiculo que pertenece"
        mask="#######"
        prefix="$"
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.numero_Factura"
        label="Número de factura"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.aseguradora"
        label="Nombre de aseguradora"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.numero_Seguro"
        label="Número de poliza de seguro"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        label="Fecha de inicio de seguro"
        v-model="vehiculo.fecha_Inicio_Seguro"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                v-model="vehiculo.fecha_Inicio_Seguro"
                :locale="myLocale"
                color="purple"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Ok" color="purple" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        label="Fecha de finalización de seguro"
        v-model="vehiculo.fecha_Fin_Seguro"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                v-model="vehiculo.fecha_Fin_Seguro"
                :locale="myLocale"
                color="purple"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Ok" color="purple" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';

//import { useAuthStore } from "../../../store/auth_store";
const $q = useQuasar();
const registroStore = useRegistroVehicularStore();
const { vehiculo, list_Area, list_Responsables, list_Bodegas, myLocale } =
  storeToRefs(registroStore);
const bodegaId = ref(null);
const areaId = ref(null);
const responsableId = ref(null);

watch(areaId, (val) => {
  if (val.value != null) {
    cargarDatosEmpleados(val.value);
  }
});

watch(bodegaId, (val) => {
  if (val.value != null) {
    vehiculo.value.bodega = bodegaId.value.label;
    vehiculo.value.bodega_Id = bodegaId.value.value;
  }
});

watch(responsableId, (val) => {
  if (val.value != null) {
    vehiculo.value.responsable = responsableId.value.label;
    vehiculo.value.responsable_Id = responsableId.value.value;
  }
});

onMounted(() => {
  if (vehiculo.value.id != 0) {
    cargarDatos();
  }
});

const cargarDatos = async () => {
  $q.loading.show();

  await cargarBodega();
  await cargarAreas();
  $q.loading.hide();
};

const cargarBodega = async () => {
  const bodegaFiltrado = list_Bodegas.value.find(
    (x) => x.value == `${vehiculo.value.bodega_Id}`
  );
  bodegaId.value = bodegaFiltrado;
};

const cargarAreas = async () => {
  const areaFiltrado = list_Area.value.find(
    (x) => x.value == `${vehiculo.value.area_Id}`
  );
  areaId.value = areaFiltrado;
};

const cargarDatosEmpleados = async (id) => {
  await registroStore.loadResponsables(id);
  if (vehiculo.value.id != 0) {
    const responsableFiltrado = list_Responsables.value.find(
      (x) => x.value == `${vehiculo.value.responsable_Id}`
    );
    responsableId.value = responsableFiltrado;
  }
};
</script>
