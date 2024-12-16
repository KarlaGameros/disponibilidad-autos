<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1200px; max-width: 800vw">
      <q-card-section class="row">
        <div class="text-h6">Registro de Vehículo</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false), (step = 1)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" ref="form">
          <q-stepper v-model="step" ref="stepper" color="accent" animated>
            <q-step :name="1" title="Datos del véhiculo" icon="directions_car">
              <FormularioVehicular />
            </q-step>

            <q-step :name="2" title="Datos administración" icon="badge">
              <FormularioAdministracion />
            </q-step>

            <!--<q-step :name="3" title="Contactos de emergencia" icon="groups">
              <FormularioContacto
                v-if="modulo == null ? false : modulo.registrar"
              />
            </q-step>
            <q-step :name="4" title="Documentación" icon="folder">
              <FormularioDocumentos
                v-if="modulo == null ? false : modulo.registrar"
              />
            </q-step>-->

            <template v-slot:navigation>
              <div
                v-if="modulo == null ? false : modulo.registrar"
                class="q-pb-lg q-pr-lg"
                style="display: flex; justify-content: flex-end"
              >
                <q-stepper-navigation>
                  <q-btn
                    v-if="step > 1"
                    color="negative"
                    @click="$refs.stepper.previous()"
                    label="Regresar"
                    class="q-mr-sm"
                  />
                  <q-btn
                    @click="validateStep()"
                    color="positive"
                    :label="step === 2 ? 'Guardar' : 'Siguiente'"
                  />
                </q-stepper-navigation>
              </div>
            </template>
          </q-stepper>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
//import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';
import {
  FormularioVehicular,
  FormularioAdministracion,
} from '../components/components';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../../stores/auth_store';
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);

const $q = useQuasar();
const registroStore = useRegistroVehicularStore();
const { modal, vehiculo } = storeToRefs(registroStore);

const step = ref(1);
const form = ref(null);

const actualizarModal = async () => {
  registroStore.initVehiculo();
  registroStore.actualizarModal(false);
};

onBeforeMount(() => {
  //leerPermisos();
  cargarDatos();
});

const cargarDatos = async () => {};

const validateStep = async () => {
  $q.loading.show();
  let isValid = false;
  switch (step.value) {
    case 1:
      isValid = await form.value.validate();
      if (isValid) {
        step.value++;
      }
      break;
    case 2:
      isValid = await form.value.validate();
      let respuesta = await onSubmit();
      if (isValid) {
        if (respuesta == true) {
          step.value = 1;
        }
      }
      break;

    default:
      isValid = true;
  }

  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();

  if (vehiculo.value.id != 0) {
    resp = await registroStore.updateVehiculo(vehiculo.value);
  } else {
    resp = await registroStore.createVehiculo(vehiculo.value);
  }
  if (resp.success) {
    await registroStore.loadVehiculos();
    step.value = 1;
    actualizarModal();
    $q.notify({
      type: 'positive',
      message: resp.data,
    });
  } else {
    $q.notify({
      type: 'negative',
      message: resp.data,
    });
  }
  $q.loading.hide();
  return resp.success;
};
</script>
