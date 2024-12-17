<template>
  <q-page>
    <q-card style="width: 100%; max-width: 100%">
      <div class="row bg-white">
        <div class="col">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs>
              <q-breadcrumbs-el
                icon="arrow_back"
                to="observaciones_Vehiculo"
                label="Volver al registro"
              />
              <q-breadcrumbs-el icon="directions_car" label="Vehículo" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
      <q-card-section class="row">
        <div class="text-h6">
          Registro de observación del vehículo {{ vehiculo.nombre }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="row q-col-gutter-xs" @submit="onSubmit">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="observaciones.vehiculo"
              label="Vehículo"
              autogrow
              readonly
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input
              v-model="observaciones.empleado"
              label="Quien registra"
              autogrow
              readonly
            />
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input v-model="observaciones.asunto" label="Asunto" autogrow />
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model="observaciones.observacion"
              label="Describa la observación"
              autogrow
            />
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-file
              v-model="filesImages"
              label="Subir imagenes"
              multiple
              accept=".jpg, .png, image/*"
              @rejected="onRejected"
              :max-files="2"
              counter
              use-chips
            />
          </div>

          <q-space />
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="negative"
                @click="actualizarModal(2)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="positive"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <TablaObservacionesVehiculo />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { useRegistroVehicularStore } from 'src/stores/registro-vehicular';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { TablaObservacionesVehiculo } from './components';
const registroStore = useRegistroVehicularStore();
const { vehiculo, observaciones } = storeToRefs(registroStore);
const $q = useQuasar();
const filesImages = ref([]);
const actualizarModal = (tipo) => {
  $q.loading.show();
  filesImages.value = [];
  if (tipo == 2) {
    registroStore.actualizarModalObservacion(false);
    registroStore.initObservacion(2);
  } else {
    registroStore.initObservacion(1);
  }

  $q.loading.hide();
};

/*watch(puesto.value, (val) => {
  if (val.id != null) {
    cargarTabulador(val);
  }
});*/

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  let fotoUno = null;
  let fotoDos = null;

  if (filesImages.value.length == 1) {
    fotoUno = filesImages.value[0];
  } else if (filesImages.value.length == 2) {
    fotoUno = filesImages.value[0];
    fotoDos = filesImages.value[1];
  }
  const FotosData = new FormData();
  FotosData.append('Vehiculo_Id', observaciones.value.vehiculo_Id.toString());
  FotosData.append('Empleado_Id', observaciones.value.empleado_Id.toString());
  FotosData.append('Asunto', observaciones.value.asunto);
  FotosData.append('Observacion', observaciones.value.observacion);
  FotosData.append('Foto_1', fotoUno);
  FotosData.append('Foto_2', fotoDos);

  resp = await registroStore.createObservacionVehiculos(FotosData);

  if (resp.success) {
    $q.notify({
      type: 'positive',
      message: resp.data,
    });
    await registroStore.loadObservacionesByVehiculo(vehiculo.value.id);
    actualizarModal(1);
  } else {
    $q.notify({
      type: 'negative',
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>

Vehiculo_Id * Empleado_Id * Asunto * Observacion * Foto_1 Foto_2
