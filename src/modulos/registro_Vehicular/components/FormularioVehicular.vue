<template>
  <div class="row q-col-gutter-sm">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.nombre"
        label="Nombre en sistema"
        autogrow
        lazy-rules
        :rules="[(val) => !!val || 'El nombre es requerido']"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.descripcion"
        label="Descripción del vehículo"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.marca"
        label="Marca del vehículo"
        autogrow
        lazy-rules
        :rules="[(val) => !!val || 'La marca es requerida']"
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.linea"
        label="Modelo del vehículo"
        autogrow
        lazy-rules
        :rules="[(val) => !!val || 'El año es requerido']"
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.modelo"
        label="Año del vehículo"
        mask="####"
        autogrow
        lazy-rules
        :rules="[(val) => !!val || 'El año es requerido']"
      />
    </div>

    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input v-model="vehiculo.color" label="Color del vehículo" autogrow />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.numero_Serie"
        label="Número de serie del vehículo"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.numero_Motor"
        label="Número del motor del vehículo"
        autogrow
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-select
        v-model="vehiculo.tipo_Motor"
        label="Tipo de motor"
        autogrow
        :options="['4 Cilindros', '6 Cilindros', 'Diesel', 'Electrico']"
      />
    </div>

    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.cantidad_Ocupantes"
        label="Cantidad de ocupantes"
        autogrow
        mask="###"
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <q-input
        v-model="vehiculo.kilometraje"
        label="Kilometraje del véhiculo"
        autogrow
        mask="#######"
      />
    </div>
  </div>
</template>
<script setup>
//import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
//import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';

//import { useAuthStore } from "../../../store/auth_store";
const registroStore = useRegistroVehicularStore();
const { vehiculo } = storeToRefs(registroStore);
//const $q = useQuasar();

//const authStore = useAuthStore();
//const { modulo } = storeToRefs(authStore);

/*const actualizarModal = (valor) => {
  puestoStore.actualizarModal(valor);
  puestoStore.initPuesto();
  tabuladorId.value = '';
};

/*watch(puesto.value, (val) => {
  if (val.id != null) {
    cargarTabulador(val);
  }
});

const cargarTabulador = async (val) => {
  const tabuladorFiltrado = listaTabuladorSelect.value.find(
    (x) => x.value == `${val.nivel_Tabulador_Id}`
  );
  tabuladorId.value = tabuladorFiltrado;
};*/
</script>
