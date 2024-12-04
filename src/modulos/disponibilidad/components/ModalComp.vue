<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="jump-right"
    transition-hide="jump-left"
  >
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section class="row flotante bg-grey-4">
        <q-img src="../../../assets/IEEN300.png" width="90px" />
        <div
          class="text-h5 text-gray-ieen-1 text-bold absolute-center text-center"
        >
          "{{ vehiculo }}" <br />
          {{ fecha_Calendario }}
        </div>
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
        <q-timeline color="purple-ieen">
          <q-timeline-entry
            v-if="pases_Detalle.length > 0"
            title="PASES INTERMEDIOS"
            subtitle="PASES"
          >
            <div>
              <q-list v-if="pases_Detalle.length > 0" dense padding>
                <q-item v-for="pase in pases_Detalle" :key="pase" v-ripple>
                  <q-item-section>
                    {{ pase }}
                  </q-item-section>
                  <!-- <br />
                  <q-item-section> {{ pase.split(' - ')[1] }} </q-item-section>
                  <br />
                  <q-item-section> {{ pase.split(' - ')[2] }} </q-item-section> -->
                </q-item>
              </q-list>
              <q-item v-else>
                <q-item-section>- Sin pases intermedios </q-item-section>
              </q-item>
            </div>
          </q-timeline-entry>
          <q-timeline-entry
            v-if="solicitudes_Detalle.length > 0"
            title="GASTOS A COMPROBAR"
            subtitle="COMISIÓN"
          >
            <div>
              <q-list v-if="solicitudes_Detalle.length > 0" dense padding>
                <q-item
                  v-for="solicitud in solicitudes_Detalle"
                  :key="solicitud"
                  v-ripple
                >
                  <q-item-section>
                    {{ solicitud }}
                  </q-item-section>
                  <!-- <br />
                  <q-item-section>
                    {{ solicitud.split(' - ')[1] }}
                  </q-item-section>
                  <br />
                  <q-item-section>
                    {{ solicitud.split(' - ')[2] }}
                  </q-item-section> -->
                </q-item>
              </q-list>
              <q-item v-else>
                <q-item-section>- Sin comisiones </q-item-section>
              </q-item>
            </div>
          </q-timeline-entry>
          <q-timeline-entry heading />
        </q-timeline>
      </q-card-section>
      <q-card-section class="text-grey-8">
        <hr />
        <i
          >La información que se muestra a continuación es de carácter
          informativo; por lo que tendrá que verificar su disponibilidad con las
          áreas responsables.
        </i>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDisponibilidadStore } from 'src/stores/disponibilidad-store';

//-----------------------------------------------------------------------

const disponibilidadStore = useDisponibilidadStore();
const {
  modal,
  fecha_Calendario,
  solicitudes_Detalle,
  pases_Detalle,
  vehiculo,
} = storeToRefs(disponibilidadStore);

//-----------------------------------------------------------------------

const actualizarModal = (valor: boolean) => {
  disponibilidadStore.actualizarModal(valor);
};
</script>
