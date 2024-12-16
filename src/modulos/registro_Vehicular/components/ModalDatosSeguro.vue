<template>
  <q-card bordered>
    <q-item class="bg-purple text-white">
      <q-item-section>
        <q-item-label class="text-bold text-h6">Datos del seguro</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-12">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.aseguradora }}</q-item-label>
                <q-item-label caption>Aseguradora</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.numero_Seguro }}</q-item-label>
                <q-item-label caption>Número de seguro</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.fecha_Inicio_Seguro }}</q-item-label>
                <q-item-label caption>Fecha de inicio de póliza</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.fecha_Fin_Seguro }}</q-item-label>
                <q-item-label caption
                  >Fecha de finalización de póliza</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { storeToRefs } from 'pinia';
//import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';
//const $q = useQuasar();
const registroStore = useRegistroVehicularStore();
const { vehiculo } = storeToRefs(registroStore);
</script>
