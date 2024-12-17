<template>
  <q-page>
    <div class="row bg-white">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <div class="text-grey-7 text-h6">Observaciones de vehículos</div>
          <q-breadcrumbs>
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el
              icon="library_books"
              class="text-grey-7"
              label="Observación de vehículo"
            />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <q-card class="q-ma-lg">
      <TablaByArea />
    </q-card>
    <br />
  </q-page>
</template>

<script setup>
import { useRegistroVehicularStore } from 'src/stores/registro-vehicular';
import { useQuasar } from 'quasar';
import { useAuthStore } from '../../../stores/auth_store';
const authStore = useAuthStore();
//import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { TablaByArea } from '../components/components';
const registroStore = useRegistroVehicularStore();
const $q = useQuasar();
onBeforeMount(() => {
  cargarDatos();
});

const cargarDatos = async () => {
  $q.loading.show();
  await registroStore.loadVehiculosByArea();
  await authStore.loadModulo('DV-OBS-VEH');

  $q.loading.hide();
};
//const registroStore = useRegistroVehicularStore();
//const { vehiculo, observaciones } = storeToRefs(registroStore);
//const $q = useQuasar();
//const filesImages = ref([]);
/*const actualizarModal = (tipo) => {
  $q.loading.show();
  filesImages.value = [];
  if (tipo == 2) {
    registroStore.actualizarModalObservacion(false);
    registroStore.initObservacion(2);
  } else {
    registroStore.initObservacion(1);
  }

  $q.loading.hide();
};*/

/*watch(puesto.value, (val) => {
  if (val.id != null) {
    cargarTabulador(val);
  }
});*/

/*const onSubmit = async () => {
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
};*/
</script>

<style></style>
