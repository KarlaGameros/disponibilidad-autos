<template>
  <q-page>
    <div class="row bg-grey-1">
      <div class="col-9">
        <div class="q-pa-md q-gutter-sm">
          <div class="text-grey-7 text-h6">Registro de vehiculos</div>
          <q-breadcrumbs>
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el
              icon="library_books"
              class="text-grey-7"
              label="Registro vehicular"
            />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-right q-pa-md items-start q-gutter-md">
          <q-btn
            v-if="modulo == null ? false : modulo.registrar"
            type="button"
            class="q-ma-sm"
            style="background-color: #673e84"
            text-color="white"
            icon-right="add_circle_outline"
            label="Nuevo"
            @click="actualizarModal"
          />
        </div>
      </div>
    </div>

    <q-card class="q-ma-lg">
      <TablaRegistro />
    </q-card>
    <ModalRegistro />
    <ModalFotos />
    <FormularioObservaciones />
  </q-page>
</template>

<script setup lang="ts">
import {
  TablaRegistro,
  ModalRegistro,
  ModalFotos,
  FormularioObservaciones,
  Modulo,
} from '../components/components';
import { onBeforeMount, Ref } from 'vue';
import { useRegistroVehicularStore } from 'src/stores/registro-vehicular';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../../stores/auth_store';
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore) as { modulo: Ref<Modulo | null> };
const registroStore = useRegistroVehicularStore();
const $q = useQuasar();
const actualizarModal = async () => {
  registroStore.initVehiculo();
  await registroStore.loadBodegas();
  await registroStore.loadAreas();
  registroStore.actualizarModal(true);
};
onBeforeMount(() => {
  cargarDatos();
});

const cargarDatos = async () => {
  $q.loading.show();
  await registroStore.loadVehiculos();
  await authStore.loadModulo('DV-REG-VEH');
  $q.loading.hide();
};
//import { ref } from 'vue';
</script>
