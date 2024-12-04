<template>
  <div class="row">
    <div class="col-lg-4 col-xs-12">
      <div class="text-bold text-grey-8">Seleccionar vehículo</div>
      <q-select
        dense
        filled
        label="Vehículo"
        color="purple-ieen"
        v-model="vehiculo_Id"
        :options="list_Vehiculos"
        hint="Seleccione un vehículo"
      />
    </div>
  </div>
  <div class="demo-app" v-if="list_By_Vehiculo.length > 0">
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <q-btn
            v-if="
              arg.event.extendedProps.pases.length > 0 ||
              arg.event.extendedProps.solicitudes.length > 0
            "
            style="width: 110px"
            @click="
              verDetalle(
                vehiculo_Id.label,
                arg.event.start,
                arg.event.extendedProps.pases,
                arg.event.extendedProps.solicitudes
              )
            "
            :label="arg.event.title"
            icon-right="visibility"
            dense
            size="sm"
            class="text-white"
            :color="
              arg.event.title == 'Ver solicitudes' ? 'purple-ieen' : 'grey'
            "
          />
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vehiculo } from '../components/modelsDisponibilidad';
import { storeToRefs } from 'pinia';
import { useDisponibilidadStore } from 'src/stores/disponibilidad-store';
import { onBeforeMount, ref, watch } from 'vue';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

//-----------------------------------------------------------------------

const $q = useQuasar();
const disponibilidadStore = useDisponibilidadStore();
const {
  list_By_Vehiculo,
  fecha_Calendario,
  pases_Detalle,
  solicitudes_Detalle,
  list_Vehiculos,
  vehiculo,
} = storeToRefs(disponibilidadStore);
const vehiculo_Id = ref(null);

//-----------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-----------------------------------------------------------------------

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  buttonText: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    list: 'list',
  },
  initialView: 'dayGridMonth',
  events: list_By_Vehiculo,
  editable: false,
  selectable: false,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  locale: 'es',
  dayHeaderFormat: { weekday: 'long' },
  validRange: {
    start: '2024-11-01',
    end: '2024-11-30',
  },
});

watch(vehiculo_Id, (val) => {
  if (val != null) {
    cargarCalendar(val);
  }
});

//-----------------------------------------------------------------------

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

const cargarData = async () => {
  loading();
  await disponibilidadStore.load_Vehiculos();
  $q.loading.hide();
};

const cargarCalendar = async (val: Vehiculo) => {
  loading();
  await disponibilidadStore.load_Disponibilidad_By_Vehiculo(val.value);
  let dias_Mes = new Date(
    parseInt(list_By_Vehiculo.value[0].start.split('-')[0]),
    parseInt(list_By_Vehiculo.value[0].start.split('-')[1]),
    0
  ).getDate();
  calendarOptions.value = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'list',
    },
    initialView: 'dayGridMonth',
    events: list_By_Vehiculo,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    locale: 'es',
    dayHeaderFormat: { weekday: 'long' },
    validRange: {
      start: list_By_Vehiculo.value[0].start,
      end: `${list_By_Vehiculo.value[0].start.split('-')[0]}-${
        list_By_Vehiculo.value[0].start.split('-')[1]
      }-${dias_Mes + 1}`,
    },
  };
  $q.loading.hide();
};

const verDetalle = (
  vehiculoNombre: string,
  fecha: Date,
  pases: [],
  solicitudes: []
) => {
  vehiculo.value = vehiculoNombre;
  fecha_Calendario.value = fecha.toISOString().slice(0, 10);
  pases_Detalle.value = pases;
  solicitudes_Detalle.value = solicitudes;
  disponibilidadStore.actualizarModal(true);
};
</script>
<style lang="css">
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  max-width: 1200px;
  margin: 0 auto;
}

.fc-event {
  border-color: #ffff;
  background-color: #ffff;
  text-align: justify;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
