<template>
  <q-card bordered>
    <q-item class="bg-purple text-white">
      <q-item-section>
        <q-item-label class="text-bold text-h6"
          >Información general del vehículo {{ vehiculo.nombre }}</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-4">
        <div class="q-pa-md">
          <q-carousel
            v-if="list_Fotos.length > 0"
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
            autoplay
          >
            <q-carousel-slide
              v-for="item in list_Fotos"
              :key="item.id"
              :name="item.id"
              :img-src="item.foto_Url"
            />
          </q-carousel>
          <template v-else>
            <div class="absolute-full flex flex-center bg-accent text-white">
              Sin imagenes cargadas
            </div>
          </template>
        </div>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-8">
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.marca }}</q-item-label>
                <q-item-label caption>Marca</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.modelo }}</q-item-label>
                <q-item-label caption>Modelo</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.color }}</q-item-label>
                <q-item-label caption>Color</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.descripcion }}</q-item-label>
                <q-item-label caption>Descripción</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.linea }}</q-item-label>
                <q-item-label caption>Linea</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.numero_Motor }}</q-item-label>
                <q-item-label caption>Número de motor</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.tipo_Motor }}</q-item-label>
                <q-item-label caption>Tipo de motor</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.kilometraje }}</q-item-label>
                <q-item-label caption>Kilometraje</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ vehiculo.cantidad_Ocupantes }}</q-item-label>
                <q-item-label caption>Ocupantes</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ vehiculo.numero_Placas }}</q-item-label>
                <q-item-label caption>Placas</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="adjust" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ vehiculo.no_Inventario }}</q-item-label>
                <q-item-label caption>Número de inventario</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
//import { useQuasar } from 'quasar';
import { useRegistroVehicularStore } from '../../../stores/registro-vehicular';
//const $q = useQuasar();
const registroStore = useRegistroVehicularStore();
const { vehiculo, list_Fotos } = storeToRefs(registroStore);
const slide = ref();

onMounted(() => {
  if (list_Fotos.value.length > 0) {
    slide.value = list_Fotos.value[0].id;
  }
});
</script>
