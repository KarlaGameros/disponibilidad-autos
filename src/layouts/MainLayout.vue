<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-purple-ieen">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Disponibilidad de vehículos </q-toolbar-title>
        <q-btn flat round dense icon="apps" @click="show" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-img
        class="absolute-top"
        src="~assets/FondoIEEN.png"
        style="height: 150px"
      >
        <div class="bg-transparent">
          <div class="text-weight-bold text-black">
            <br />
            Bienvenido(a) <br />

            {{ usuario }}
          </div>
        </div>
      </q-img>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <q-item
            v-if="menuList.some((element) => element == 'DV-CON-VEH')"
            :to="{ name: 'ver_Disponibilidad' }"
            :content-inset-level="2"
            :header-inset-level="2"
            class="text-grey-8 text-bold"
            active-class="text-purple-ieen"
          >
            <q-item-section avatar>
              <q-icon name="directions_car" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Ver disponibilidad</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-if="menuList.some((element) => element == 'DV-REG-VEH')"
            :to="{ name: 'registro_Vehicular' }"
            :content-inset-level="2"
            :header-inset-level="2"
            class="text-grey-8 text-bold"
            active-class="text-purple-ieen"
          >
            <q-item-section avatar>
              <q-icon name="garage" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Registro Vehicular</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-if="menuList.some((element) => element == 'DV-OBS-VEH')"
            :to="{ name: 'observaciones_Vehiculo' }"
            :content-inset-level="2"
            :header-inset-level="2"
            class="text-grey-8 text-bold"
            active-class="text-purple-ieen"
          >
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Observaciones Vehículos</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth_store';
import { EncryptStorage } from 'storage-encryption';
import { onBeforeMount, ref } from 'vue';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { urlSistemas } from 'src/boot/axios';

const $q = useQuasar();
const route = useRoute();
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);
const { modulos, apps } = storeToRefs(authStore);
const encryptStorage = new EncryptStorage('SECRET_KEY', 'sessionStorage');
const usuario = ref('');
const menuList = ref(<string[]>[]);

onBeforeMount(async () => {
  if (route.query.key) {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'purple-ieen',
      spinnerSize: 140,
      backgroundColor: 'purple-3',
      message: 'Espere un momento, por favor...',
      messageColor: 'black',
    });
    encryptStorage.encrypt('key', route.query.key);
    const resp = await authStore.validarToken(
      route.query.key,
      route.query.sistema
    );
    $q.loading.hide();
    if (resp.success == false) {
      localStorage.clear();
      sessionStorage.clear();
      encryptStorage.remove('key');
      window.location.href = `${urlSistemas}:9271?return=false`;
    }
  }

  if (route.query.sistema) {
    encryptStorage.encrypt('sistema', route.query.sistema);
  }

  if (route.query.usr) {
    encryptStorage.encrypt('usuario', route.query.usr);
    usuario.value = encryptStorage.decrypt('usuario');
  } else {
    if (encryptStorage.decrypt('usuario') != null) {
      usuario.value = encryptStorage.decrypt('usuario');
    }
  }

  cargarData();
});

const cargarData = async () => {
  loadMenu();
};

const loading = () => {
  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: 'purple-ieen',
    spinnerSize: 140,
    backgroundColor: 'purple-3',
    message: 'Espere un momento, por favor...',
    messageColor: 'black',
  });
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

interface Modulo {
  siglas_Modulo: string;
}

const loadMenu = async () => {
  loading();
  await authStore.loadSistemas();
  await authStore.loadModulos();
  await authStore.loadDatosEmp();
  await authStore.loadRolEmp();
  modulos.value.forEach((element: Modulo) => {
    switch (element.siglas_Modulo) {
      case 'DV-CON-VEH':
        menuList.value.push('DV-CON-VEH');
        break;
    }
    switch (element.siglas_Modulo) {
      case 'DV-REG-VEH':
        menuList.value.push('DV-REG-VEH');
        break;
    }
    switch (element.siglas_Modulo) {
      case 'DV-OBS-VEH':
        menuList.value.push('DV-OBS-VEH');
        break;
    }
  });
  $q.loading.hide();
};

const show = () => {
  $q.bottomSheet({
    message: 'Aplicaciones',
    grid: true,
    actions: apps.value,
  }).onOk((action) => {
    if (action.label == 'Cerrar sesión') {
      localStorage.clear();
      sessionStorage.clear();
      encryptStorage.remove('key');
      window.location.href = `${urlSistemas}:9271?return=false`;
    } else if (action.label == 'Ir a universo') {
      window.location.href = `${urlSistemas}:9271?return=true`;
    } else {
      window.location.href = `${urlSistemas}:${
        action.url.split(':')[2]
      }/#/?key=${encryptStorage.decrypt('key')}&sistema=${
        action.id
      }&usr=${encryptStorage.decrypt('usuario')}`;
    }
  });
};
</script>
<style lang="scss">
.text-purple-ieen {
  color: #673e84 !important;
}
.bg-purple-ieen {
  background: #673e84 !important;
}
.text-purple-ieen-1 {
  color: #863399 !important;
}
.bg-purple-ieen-1 {
  background: #863399 !important;
}
.text-purple-ieen-2 {
  color: #a25eb5 !important;
}
.bg-purple-ieen-2 {
  background: #a25eb5 !important;
}
.text-purple-ieen-3 {
  color: #bb83ca !important;
}
.bg-purple-ieen-3 {
  background: #bb83ca !important;
}
.text-gray-ieen-1 {
  color: #76777a !important;
}
.bg-gray-ieen-1 {
  background: #76777a !important;
}
.text-gray-ieen-2 {
  color: #98989a !important;
}
.bg-gray-ieen-2 {
  background: #98989a !important;
}
.text-gray-ieen-3 {
  color: #b1b1b1 !important;
}
.bg-gray-ieen-3 {
  background: #b1b1b1 !important;
}
</style>
