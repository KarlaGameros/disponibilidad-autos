<template>
  <q-page>
    <div class="row bg-white">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              icon="arrow_back"
              to="registro_Vehicular"
              label="Volver al registro"
            />
            <q-breadcrumbs-el icon="directions_car" label="Vehículo" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
        <ModalDatosVehiculo />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
        <ModalDatosSeguro />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
        <ModalDatosResponsable />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
        <ModalObservacionesConsulta />
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
        <ModalDatosHistorico />
      </div>
    </div>
    <br />
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import {
  ModalDatosVehiculo,
  ModalDatosSeguro,
  ModalDatosResponsable,
  ModalDatosHistorico,
  ModalObservacionesConsulta,
} from '../components/components';

//const { modulo } = storeToRefs(authStore);
const $q = useQuasar();

onBeforeMount(() => {
  cargarDatos();
});

const cargarDatos = async () => {
  $q.loading.show();

  //await datosPersonaleStore.loadMunicipios(18);
  //await areaStore.loadAreas();
  $q.loading.hide();
};
</script>

<style></style>
