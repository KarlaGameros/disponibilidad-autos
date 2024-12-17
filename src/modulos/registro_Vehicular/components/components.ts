export interface Column {
  name: string;
  align?: 'left' | 'center' | 'right';
  label: string;
  field: string;
  sortable: boolean;
}

export interface Rows {
  vehiculo: string;
  responsable: string;
  bodega: string;
  id: number;
}

export interface Modulo {
  actualizar: boolean;
  eliminar: boolean;
  leer: boolean;
  registrar: boolean;
}

import TablaRegistro from './TablaRegistro.vue';
import ModalRegistro from './ModalRegistro.vue';
import FormularioVehicular from './FormularioVehicular.vue';
import FormularioAdministracion from './FormularioAdministracion.vue';
import ModalFotos from './ModalFotos.vue';
import ModalDatosVehiculo from './ModalDatosVehiculo.vue';
import ModalDatosSeguro from './ModalDatosSeguro.vue';
import ModalDatosResponsable from './ModalDatosResponsable.vue';
import ModalDatosHistorico from './ModalDatosHistorico.vue';
import FormularioObservaciones from './FormularioObservaciones.vue';
import TablaObservacionesVehiculo from './TablaObservacionesVehiculo.vue';
import ModalObservacionesConsulta from './ModalObservacionesConsulta.vue';
import TablaByArea from './TablaByArea.vue';

export {
  TablaRegistro,
  ModalRegistro,
  FormularioVehicular,
  FormularioAdministracion,
  ModalFotos,
  ModalDatosVehiculo,
  ModalDatosSeguro,
  ModalDatosResponsable,
  ModalDatosHistorico,
  FormularioObservaciones,
  TablaObservacionesVehiculo,
  ModalObservacionesConsulta,
  TablaByArea,
};
