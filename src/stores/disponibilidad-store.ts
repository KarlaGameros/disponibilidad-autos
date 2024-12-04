import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

const hoy = new Date();

interface Disponibilidad {
  fecha: string;
  estatus: string;
  detalle: [];
  pases: [];
  solicitudes: [];
}

interface ByVehiculo {
  start: string;
  estatus: string;
  detalle: [];
}

interface Vehiculos {
  label: string;
  value: string;
}

export const useDisponibilidadStore = defineStore('useDisponibilidadStore', {
  state: () => ({
    modal: false,
    fecha_Calendario: '',
    vehiculo: '',
    solicitudes_Detalle: [],
    pases_Detalle: [],
    list_Vehiculos: [],
    list_Disponibilidad: <Disponibilidad[]>[],
    list_By_Vehiculo: <ByVehiculo[]>[],
  }),
  actions: {
    actualizarModal(valor: boolean) {
      this.modal = valor;
    },

    //-----------------------------------------------------------------------

    async load_Disponibilidad_Autos() {
      try {
        const resp = await api.get('/Vehiculos/Disponibilidad');
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_Disponibilidad = data.map((item: Disponibilidad) => {
              return {
                fecha: item.fecha,
                detalle: item.detalle,
                estatus: '',
              };
            });
            // this.list_Disponibilidad = data
            //   .map((entry: Disponibilidad) => {
            //     return entry.detalle.map((detail: Disponibilidad) => ({
            //       fecha: entry.fecha,
            //       estatus: '',
            //       detalle: entry.detalle,
            //       color:
            //         `${entry.fecha.split('-')[2]}-${
            //           entry.fecha.split('-')[1]
            //         }-${entry.fecha.split('-')[0]}` >=
            //         `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
            //           .toString()
            //           .padStart(2, '0')}-${hoy
            //           .getDate()
            //           .toString()
            //           .padStart(2, '0')}`
            //           ? 'Ocupado'
            //           : 'Ver detalle',
            //       pases: detail.pases,
            //       solicitudes: detail.solicitudes,
            //     }));
            //   })
            //   .flat();
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    //-----------------------------------------------------------------------

    async load_Disponibilidad_By_Vehiculo(id: number) {
      try {
        const resp = await api.get(`/Vehiculos/DisponibilidadByVehiculo/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_By_Vehiculo = data
              .map((entry: Disponibilidad) => {
                return entry.detalle.map((detail: Disponibilidad) => ({
                  start: `${entry.fecha.split('-')[2]}-${
                    entry.fecha.split('-')[1]
                  }-${entry.fecha.split('-')[0]}`,
                  title:
                    `${entry.fecha.split('-')[2]}-${
                      entry.fecha.split('-')[1]
                    }-${entry.fecha.split('-')[0]}` >=
                    `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}-${hoy
                      .getDate()
                      .toString()
                      .padStart(2, '0')}`
                      ? 'Ver solicitudes'
                      : 'Ver detalle',
                  pases: detail.pases,
                  solicitudes: detail.solicitudes,
                }));
              })
              .flat();
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    //-----------------------------------------------------------------------

    async load_Vehiculos() {
      try {
        const resp = await api.get('/Vehiculos/GetLista');
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_Vehiculos = data.map((item: Vehiculos) => {
              return {
                label: item.label,
                value: item.value,
              };
            });
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },
  },
});
