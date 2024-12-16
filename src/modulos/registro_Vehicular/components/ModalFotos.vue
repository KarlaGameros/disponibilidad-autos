<template>
  <q-dialog
    v-model="modalFoto"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1200px; max-width: 800vw">
      <q-card-section class="row">
        <div class="text-h6">Registro fotográfico de {{ vehiculo.nombre }}</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-btn
              v-if="modulo == null ? false : modulo.registrar"
              :disable="list_Fotos.length >= 4"
              style="background-color: #673e84; width: 50%"
              icon="add"
              label="Agregar fotos"
              text-color="white"
              @click="dialogFoto = true"
            />
          </div>
          <div class="col-6 text-subtitle1 text-right">
            Se permiten 4 fotografias por vehículo
            <div class="text-caption">
              Se requieren fotos de frente, lateral, motor y herramienta
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <div class="q-col-gutter-md row items-start">
            <div class="col-6" v-for="item in list_Fotos" :key="item.id">
              <q-img :src="item.foto_Url" :ratio="4 / 3">
                <div class="absolute-bottom-right">
                  <q-btn
                    v-if="modulo == null ? false : modulo.eliminar"
                    flat
                    round
                    color="white"
                    icon="delete"
                    @click="eliminar(item.id)"
                    ><q-tooltip>Eliminar fotografía</q-tooltip></q-btn
                  >
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogFoto" persistent>
    <q-card style="width: 400px; max-width: 300vw">
      <q-card-section class="row">
        <div class="text-h6">Subir fotografia</div>
        <q-space />
        <q-btn
          icon="close"
          @click="cerrarModalLocal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" ref="form">
          <div class="row q-col-gutter-sm">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-file
                v-model="filesImages"
                label="Subir imagenes"
                multiple
                accept=".jpg, .png, image/*"
                @rejected="onRejected"
                :max-files="4 - list_Fotos.length"
                counter
                use-chips
              />
            </div>
          </div>
          <q-space />
          <br />
          <br />
          <div class="col-12 justify-end">
            <div
              class="text-right q-gutter-xs"
              v-if="modulo == null ? false : modulo.registrar"
            >
              <q-btn
                label="Cancelar"
                type="reset"
                color="negative"
                @click="cerrarModalLocal(false)"
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
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue';
//import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../../stores/auth_store';
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);

const $q = useQuasar();
const registroStore = useRegistroVehicularStore();
const { modalFoto, vehiculo, list_Fotos } = storeToRefs(registroStore);
const dialogFoto = ref(false);
const filesImages = ref();

const actualizarModal = async () => {
  registroStore.actualizarModalFotografia(false);
};

const cerrarModalLocal = async () => {
  $q.loading.show();
  dialogFoto.value = false;
  filesImages.value = '';
  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  console.log('esto es filesImage', filesImages.value);
  let registros = [];
  for (let i = 0; i < filesImages.value.length; i++) {
    let fotografia = {
      Vehiculo_Id: vehiculo.value.id,
      Titulo: '',
      Foto: filesImages.value[i],
    };
    registros.push(fotografia);
  }
  resp = await registroStore.creatoFotosVehiculos(registros);
  if (resp.success) {
    await registroStore.loadFotografiasByVehiculo(vehiculo.value.id);
    cerrarModalLocal();
    $q.notify({
      type: 'positive',
      message: 'Se registraron la(s) fotografía(s)',
    });
  } else {
    $q.notify({
      type: 'negative',
      message: 'Error al subir la(s) fotografía(s)',
    });
  }

  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: 'Eliminar esta fotografía',
    message: '¿Está seguro de eliminar esta fotografía?',
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
    const resp = await registroStore.deleteFotografia(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        type: 'positive',
        message: resp.data,
      });
      registroStore.loadFotografiasByVehiculo(vehiculo.value.id);
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
