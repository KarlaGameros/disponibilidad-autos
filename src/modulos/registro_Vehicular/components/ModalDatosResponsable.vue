<template>
  <q-card bordered>
    <q-item class="bg-purple text-white">
      <q-item-section>
        <q-item-label class="text-bold text-h6"
          >Datos del responsable</q-item-label
        >
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
                <q-item-label>{{ vehiculo.area }}</q-item-label>
                <q-item-label caption>Área asignada</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.responsable }}</q-item-label>
                <q-item-label caption>Personal responsable</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.bodega }}</q-item-label>
                <q-item-label caption
                  >Bodega / Estacionamiento de resguardo</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.numero_Institucional }}</q-item-label>
                <q-item-label caption>Número institucional</q-item-label>
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
