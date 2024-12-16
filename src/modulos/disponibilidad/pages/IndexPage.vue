<template>
  <q-page>
    <div class="row bg-grey-1">
      <div class="col-9">
        <div class="q-pa-md q-gutter-sm">
          <div class="text-grey-7 text-h6">Disponibilidad</div>
          <q-breadcrumbs>
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
            <q-breadcrumbs-el
              icon="library_books"
              class="text-grey-7"
              label="Ver disponibilidad de vehículos"
            />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <ModalComp />
    <div class="row q-pr-lg q-pl-lg q-pt-lg">
      <q-banner
        inline-actions
        rounded
        class="col-12 bg-grey-4 text-grey-9 text-bold"
      >
        <q-icon name="info" size="lg" color="grey-6" />
        La información que se muestra a continuación es de carácter informativo;
        por lo que tendrá que verificar su disponibilidad con las áreas
        responsables.
      </q-banner>
    </div>
    <q-card class="q-ma-lg">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="purple-ieen"
        indicator-color="purple-ieen"
        align="justify"
      >
        <q-tab icon="apps" name="general" label="General" />
        <q-tab icon="directions_car" name="individual" label="Por vehículo" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="general">
          <TablaComp />
        </q-tab-panel>

        <q-tab-panel name="individual">
          <CalendarByVehiculo />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import ModalComp from '../components/ModalComp.vue';
import TablaComp from '../components/TablaComp.vue';
import CalendarByVehiculo from '../components/CalendarByVehiculo.vue';

const tab = ref('general');
</script>
