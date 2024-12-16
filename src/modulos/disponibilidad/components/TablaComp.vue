<template>
  <template v-if="list_Disponibilidad.length == 0">
    <q-card class="text-center" flat>
      <q-spinner-cube color="purple-ieen" size="10.5em"
    /></q-card>
  </template>
  <template v-else>
    <div class="scheduler-resource-calendar q-pr-lg q-pl-lg q-pt-lg">
      <div class="text-center text-h5 text-purple-ieen text-bold">
        {{ mesActual }}
      </div>
      <br />
      <div class="table-container">
        <div class="table-fixed">
          <table>
            <thead class="flotante">
              <tr>
                <th class="text-grey-8">
                  <q-icon name="directions_car" />Vehículos
                </th>
                <th
                  class="text-grey-8"
                  v-for="day in currentMonthDays"
                  :key="day.date"
                >
                  {{ formatDayLetra(day.dayOfWeek) }} <br />
                  {{ formatDay(day) }}
                </th>
              </tr>
            </thead>
            <tbody v-if="list_Disponibilidad.length > 0">
              <tr v-for="auto in list_Disponibilidad[0].detalle" :key="auto">
                <td
                  style="background-color: #ececec"
                  class="text-bold text-grey-8 fixed-column"
                >
                  {{ auto.vehiculo }}
                </td>
                <td v-for="day in currentMonthDays" :key="day.date">
                  <div v-if="hasEventOnDay(day.date)">
                    <div
                      v-for="event in getEventsOnDay(auto, day.date)"
                      :key="event"
                    >
                      <q-btn
                        style="width: 110px"
                        @click="
                          verDetalle(
                            auto.vehiculo,
                            event.fecha,
                            event.detalle.filter(
                              (x) => x.vehiculo == auto.vehiculo
                            )[0].pases,
                            event.detalle.filter(
                              (x) => x.vehiculo == auto.vehiculo
                            )[0].solicitudes
                          )
                        "
                        :label="event.estatus"
                        icon-right="visibility"
                        dense
                        size="sm"
                        class="text-white"
                        :color="
                          event.estatus == 'Ver solicitudes'
                            ? 'purple-ieen'
                            : 'grey'
                        "
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Day, Events, Pase } from '../components/modelsDisponibilidad';
import { useDisponibilidadStore } from '../../../stores/disponibilidad-store';
import { computed, onBeforeMount, ref } from 'vue';

//-----------------------------------------------------------------------

const disponibilidadStore = useDisponibilidadStore();
const {
  list_Disponibilidad,
  fecha_Calendario,
  solicitudes_Detalle,
  pases_Detalle,
  vehiculo,
} = storeToRefs(disponibilidadStore);
const hoy = new Date();
const mes = ref(hoy.getMonth());
const mesActual = <string>(
  hoy.toLocaleString('default', { month: 'long' }).toUpperCase()
);

//-----------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-----------------------------------------------------------------------

const daysOfWeekInSpanish = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

const cargarData = async () => {
  await disponibilidadStore.load_Disponibilidad_Autos();
};

const currentMonthDays = computed(() => {
  const firstDay = new Date(2024, mes.value, 1);
  const lastDay = new Date(2024, hoy.getMonth() + 1, 0);
  const days = [];

  for (
    let date = new Date(firstDay);
    date <= lastDay;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const dayOfWeek = daysOfWeekInSpanish[date.getDay()].toUpperCase();
    days.push({ date: formattedDate, dayOfWeek });
  }
  return days;
});

function formatDay(day: Day) {
  return day.date.split('-')[2];
}

function formatDayLetra(day: string) {
  return day;
}

function hasEventOnDay(day: string) {
  return list_Disponibilidad.value.some((event) => {
    const eventStartDate = new Date(
      `${event.fecha.split('-')[2]}-${event.fecha.split('-')[1]}-${
        event.fecha.split('-')[0]
      }`
    );
    const selectedDate = new Date(day.split(' ')[0]);
    eventStartDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= eventStartDate;
  });
}

function getEventsOnDay(resourceId: Events, day: string) {
  const selectedDate = new Date(day.split(' ')[0]);
  selectedDate.setHours(0, 0, 0, 0);
  return list_Disponibilidad.value.filter((event) => {
    const eventDate = new Date(
      `${event.fecha.split('-')[2]}-${event.fecha.split('-')[1]}-${
        event.fecha.split('-')[0]
      }`
    );
    event.estatus =
      `${event.fecha.split('-')[2]}-${event.fecha.split('-')[1]}-${
        event.fecha.split('-')[0]
      }` >=
      `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`
        ? 'Ver solicitudes'
        : 'Ver detalle';
    eventDate.setHours(0, 0, 0, 0);
    return event.detalle.some((pase: Pase) => {
      return (
        pase.vehiculo === resourceId.vehiculo &&
        eventDate.getTime() === selectedDate.getTime() &&
        (pase.pases.length != 0 || pase.solicitudes.length != 0)
      );
    });
  });
}

const verDetalle = (
  vehiculoNombre: string,
  fecha: string,
  pases: [],
  solicitudes: []
) => {
  vehiculo.value = vehiculoNombre;
  fecha_Calendario.value = fecha;
  pases_Detalle.value = pases;
  solicitudes_Detalle.value = solicitudes;
  disponibilidadStore.actualizarModal(true);
};
</script>
<style scoped>
.table-wrapper {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

.fixed-column {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: #ececec;
}

.flotante {
  position: sticky;
  top: 1px;
  z-index: 999;
  background-color: white;
}

.scheduler-resource-calendar {
  font-family: Arial, sans-serif;
  max-width: 1500px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  position: sticky;
  top: 0;
  z-index: 1;
}

th,
td {
  padding: 8px;
  text-align: center;
  border: 1px solid #eeeeee;
}

th {
  position: sticky;
  top: 0;
  background-color: #ececec;
  z-index: 2;
}

.resource-cell {
  font-weight: bold;
  position: sticky;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  z-index: 2;
}

.highlight-column {
  background-color: #f0f0f0;
}

.table-container {
  max-height: 650px;
  overflow-y: auto;
  position: relative;
}
</style>
