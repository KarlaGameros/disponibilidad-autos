import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { EncryptStorage } from 'storage-encryption';
const encryptStorage = new EncryptStorage('SECRET_KEY', 'sessionStorage');

interface Registro {
  id?: number;
  bodega_Id: number;
  bodega?: string;
  responsable_Id: number;
  responsable?: string;
  area?: string;
  area_Id?: number;
  catalago_Id: number;
  catalago?: string;
  nombre: string;
  descripcion?: string;
  numero_Serie: string;
  estatus: string;
  numero_Placas?: string;
  numero_Motor: string;
  marca: string;
  modelo: string;
  color: string;
  fecha_Compra?: string;
  importe: number;
  cantidad_Ocupantes: number;
  linea: string;
  tipo_Motor: string;
  kilometraje: number;
  no_Inventario?: string;
  disponible: boolean;
  eliminado: boolean;
  numero_Institucional: string;
  numero_Factura: string;
  aseguradora: string;
  numero_Seguro: string;
  fecha_Inicio_Seguro: string;
  fecha_Fin_Seguro: string;
}

interface AreaResponsable {
  id: number;
  // otras propiedades
}

interface Observacion {
  id?: number;
  vehiculo: string;
  vehiculo_Id: number;
  empleado: string;
  empleado_Id: number;
  asunto: string;
  observacion: string;
  foto_1: File | null;
  foto_2: File | null;
  atendido: boolean;
  fecha_Creacion: string;
  foto1_URL: '';
  foto2_URL: '';
}

interface Areas {
  label: string;
  value: number;
}

interface Bodegas {
  text: string;
  value: number;
}

interface Responsables {
  nombre_Completo: string;
  id: number;
}

interface vehiculosRegistrados {
  id: number;
  nombre: string;
  responsable: string;
  area_Id: number;
  responsable_Id: number;
  bodega: string;
  no_Inventario: string;
  numero_Institucional: string;
}

interface historialVehiculo {
  folio: string;
  solicitante: string;
  fecha: string;
  tipo: string;
  anio: number;
  mes: number;
}

interface fotosVehiculos {
  id?: number;
  Vehiculo_Id: number;
  Titulo: string;
  Foto: File;
  foto_Url?: string;
}

export const useRegistroVehicularStore = defineStore('useRegistroVehicular', {
  state: () => ({
    modal: false,
    modalFoto: false,
    modalObservación: false,
    myLocale: {
      days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
      daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
      months:
        'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
          '_'
        ),
      monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
      firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
      format24h: true,
      pluralDay: 'dias',
    },
    vehiculo: {
      id: 0,
      bodega_Id: 0,
      bodega: '',
      responsable_Id: 0,
      responsable: '',
      area: '',
      area_Id: 0,
      catalago_Id: 8,
      catalago: 'EY-10 - Vehículos',
      nombre: '',
      descripcion: '',
      numero_Serie: '',
      estatus: '',
      numero_Placas: '',
      numero_Motor: '',
      marca: '',
      modelo: '',
      color: '',
      fecha_Compra: '',
      importe: 0,
      cantidad_Ocupantes: 0,
      linea: '',
      tipo_Motor: '',
      kilometraje: 0,
      no_Inventario: '',
      disponible: false,
      eliminado: false,
      numero_Institucional: '',
      numero_Factura: '',
      aseguradora: '',
      numero_Seguro: '',
      fecha_Inicio_Seguro: '',
      fecha_Fin_Seguro: '',
    } as Registro,

    observaciones: {
      id: 0,
      vehiculo: '',
      vehiculo_Id: 0,
      empleado: '',
      empleado_Id: 0,
      asunto: '',
      observacion: '',
      foto_1: null,
      foto_2: null,
      atendido: false,
      fecha_Creacion: '',
      foto1_URL: '',
      foto2_URL: '',
    } as Observacion,

    list_Area: <Areas[]>[],
    list_Responsables: <Responsables[]>[],
    list_Bodegas: <Bodegas[]>[],
    list_Fotos: <fotosVehiculos[]>[],
    list_Vehiculos: <vehiculosRegistrados[]>[],
    list_Vehiculos_By_Area: <vehiculosRegistrados[]>[],
    list_Historial: <historialVehiculo[]>[],
    list_Historial_Filtro: <historialVehiculo[]>[],
    list_Historial_Oservaciones: <Observacion[]>[],
    //list_Disponibilidad: <Disponibilidad[]>[],
    //list_By_Vehiculo: <ByVehiculo[]>[],
  }),
  actions: {
    initVehiculo() {
      this.vehiculo.id = 0;
      this.vehiculo.bodega_Id = 0;
      this.vehiculo.bodega = '';
      this.vehiculo.responsable_Id = 0;
      this.vehiculo.responsable = '';
      this.vehiculo.area = '';
      this.vehiculo.area_Id = 0;
      this.vehiculo.catalago_Id = 8;
      this.vehiculo.catalago = 'EY-10 - Vehículos';
      this.vehiculo.nombre = '';
      this.vehiculo.descripcion = '';
      this.vehiculo.numero_Serie = '';
      this.vehiculo.estatus = '';
      this.vehiculo.numero_Placas = '';
      this.vehiculo.numero_Motor = '';
      this.vehiculo.marca = '';
      this.vehiculo.modelo = '';
      this.vehiculo.color = '';
      this.vehiculo.fecha_Compra = '';
      this.vehiculo.importe = 0;
      this.vehiculo.cantidad_Ocupantes = 0;
      this.vehiculo.linea = '';
      this.vehiculo.tipo_Motor = '';
      this.vehiculo.kilometraje = 0;
      this.vehiculo.no_Inventario = '';
      this.vehiculo.disponible = false;
      this.vehiculo.eliminado = false;
      this.vehiculo.numero_Institucional = '';
      this.vehiculo.numero_Factura = '';
      this.vehiculo.aseguradora = '';
      this.vehiculo.numero_Seguro = '';
      this.vehiculo.fecha_Inicio_Seguro = '';
      this.vehiculo.fecha_Fin_Seguro = '';
    },

    initObservacion(tipo: number) {
      this.observaciones.id = 0;
      if (tipo == 2) {
        this.observaciones.vehiculo = '';
        this.observaciones.vehiculo_Id = 0;
        this.observaciones.empleado = '';
        this.observaciones.empleado_Id = 0;
      }

      this.observaciones.asunto = '';
      this.observaciones.observacion = '';
      this.observaciones.foto_1 = null;
      this.observaciones.foto_2 = null;
      this.observaciones.atendido = false;
      this.observaciones.fecha_Creacion = '';
      this.observaciones.foto1_URL = '';
      this.observaciones.foto2_URL = '';
    },
    async loadAreas() {
      try {
        const resp = await api.get('/Areas/GetLista');
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_Area = data.map((item: Areas) => {
              return {
                label: item.label,
                value: item.value,
              };
            });
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadBodegas() {
      try {
        const resp = await api.get('/Bodegas/GetLista');
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_Bodegas = data.map((item: Bodegas) => {
              return {
                label: item.text,
                value: item.value,
              };
            });
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadResponsables(id: number) {
      try {
        const resp = await api.get(`/Empleados/ByArea/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_Responsables = data.map((item: Responsables) => {
              return {
                label: item.nombre_Completo,
                value: item.id,
              };
            });
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadVehiculos() {
      try {
        const resp = await api.get('/Vehiculos');
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.list_Vehiculos = data.map((item: vehiculosRegistrados) => {
              return {
                id: item.id,
                vehiculo: item.nombre,
                responsable: item.responsable,
                bodega: item.bodega,
                no_Inventario: item.no_Inventario,
                numero_Institucional: item.numero_Institucional,
              };
            });
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadVehiculo(id: number) {
      try {
        const resp = await api.get(`/Vehiculos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          const respEmpleado = await api.get(
            `/Empleados/${data.responsable_Id}`
          );
          const areaResponsable = respEmpleado.data.data;
          if (success == true) {
            let fechaCompra = '';
            let fechaInicioSeguro = '';
            let fechaFinalSeguro = '';
            if (data.fecha_Compra != null) {
              const fechaArray = data.fecha_Compra.split('-');
              fechaCompra =
                fechaArray[2] + '/' + fechaArray[1] + '/' + fechaArray[0];
            }
            if (data.fecha_Inicio_Seguro != null) {
              const fechaArray = data.fecha_Inicio_Seguro.split('-');
              fechaInicioSeguro =
                fechaArray[2] + '/' + fechaArray[1] + '/' + fechaArray[0];
            }
            if (data.fecha_Fin_Seguro != null) {
              const fechaArray = data.fecha_Fin_Seguro.split('-');
              fechaFinalSeguro =
                fechaArray[2] + '/' + fechaArray[1] + '/' + fechaArray[0];
            }
            this.vehiculo.id = data.id;
            this.vehiculo.bodega_Id = data.bodega_Id;
            this.vehiculo.bodega = data.bodega;
            this.vehiculo.responsable_Id = data.responsable_Id;
            this.vehiculo.responsable = data.responsable;
            this.vehiculo.area = areaResponsable.area;
            this.vehiculo.area_Id = areaResponsable.area_Id;
            this.vehiculo.catalago_Id = data.catalago_Id;
            this.vehiculo.catalago = data.catalago;
            this.vehiculo.nombre = data.nombre;
            this.vehiculo.numero_Institucional = data.numero_Institucional;
            this.vehiculo.descripcion = data.descripcion;
            this.vehiculo.numero_Serie = data.numero_Serie;
            this.vehiculo.estatus = data.estatus;
            this.vehiculo.numero_Placas = data.numero_Placas;
            this.vehiculo.numero_Motor = data.numero_Motor;
            this.vehiculo.marca = data.marca;
            this.vehiculo.modelo = data.modelo;
            this.vehiculo.color = data.color;
            this.vehiculo.fecha_Compra = fechaCompra;
            this.vehiculo.numero_Factura = data.numero_Factura;
            this.vehiculo.aseguradora = data.aseguradora;
            this.vehiculo.numero_Seguro = data.numero_Seguro;
            this.vehiculo.fecha_Inicio_Seguro = fechaInicioSeguro;
            this.vehiculo.fecha_Fin_Seguro = fechaFinalSeguro;
            this.vehiculo.importe = data.importe;
            this.vehiculo.cantidad_Ocupantes = data.cantidad_Ocupantes;
            this.vehiculo.linea = data.linea;
            this.vehiculo.tipo_Motor = data.tipo_Motor;
            this.vehiculo.kilometraje = data.kilometraje;
            this.vehiculo.no_Inventario = data.no_Inventario;
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadVehiculosByArea() {
      try {
        const resp = await api.get('/Vehiculos');
        if (resp.status == 200) {
          const { success, data } = resp.data;
          const respEmpleado = await api.get('/Empleados');
          const areaResponsable = respEmpleado.data.data;
          if (success == true) {
            const vehiculos = data.map((item: vehiculosRegistrados) => {
              const area = areaResponsable.find(
                (x: AreaResponsable) => x.id == item.responsable_Id
              );
              return {
                id: item.id,
                vehiculo: item.nombre,
                responsable: item.responsable,
                area_Id: area.area_Id,
                bodega: item.bodega,
                no_Inventario: item.no_Inventario,
                numero_Institucional: item.numero_Institucional,
              };
            });
            if (
              parseInt(encryptStorage.decrypt('area_Id')) != 9 &&
              parseInt(encryptStorage.decrypt('area_Id')) != 6
            ) {
              this.list_Vehiculos_By_Area = vehiculos.filter(
                (x: vehiculosRegistrados) =>
                  x.area_Id == parseInt(encryptStorage.decrypt('area_Id'))
              );
            } else {
              this.list_Vehiculos_By_Area = vehiculos;
            }
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadFotografiasByVehiculo(id: number) {
      try {
        this.list_Fotos = [];
        const resp = await api.get(`/FotografiasVehiculos/ByVehiculo/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true && data.length > 0) {
            this.list_Fotos = data.map((item: fotosVehiculos) => {
              return {
                id: item.id,
                vehiculo_id: item.Vehiculo_Id,
                titulo: item.Titulo,
                foto_Url: item.foto_Url,
              };
            });
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async createVehiculo(vehiculo: Registro[]) {
      try {
        const resp = await api.post('/Vehiculos', vehiculo);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async updateVehiculo(vehiculo: Registro) {
      try {
        const resp = await api.put(`/Vehiculos/${vehiculo.id}`, vehiculo);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async deleteVehiculo(id: number) {
      try {
        const resp = await api.delete(`/Vehiculos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: 'Ocurrio un error, intentelo de nuevo',
          };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async creatoFotosVehiculos(fotos: fotosVehiculos[]) {
      try {
        let conteo = 0;
        let resp = null;
        for (const foto of fotos) {
          const FotosData = new FormData();
          FotosData.append('Vehiculo_Id', foto.Vehiculo_Id.toString());
          FotosData.append('Titulo', foto.Titulo);
          FotosData.append('Foto', foto.Foto);
          resp = await api.post('/FotografiasVehiculos', FotosData, {
            headers: {
              'Content-Type': `"multipart/form-data";
                `,
            },
          });
          if (resp.status == 200) {
            const { success } = resp.data;
            if (success === true) {
              conteo = conteo + 1;
            }
          }
        }
        if (fotos.length == conteo) {
          return { success: true };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async deleteFotografia(id: number) {
      try {
        const resp = await api.delete(`/FotografiasVehiculos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: 'Ocurrio un error, intentelo de nuevo',
          };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadHistorialMes(id: number) {
      try {
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear(); // Obtiene el año actual
        const mesActual = fechaActual.getMonth() + 1;
        const resp = await api.get(`/Vehiculos/HistorialByVehiculo/${id}`);
        if (resp.status == 200) {
          const { success, gastos, pases } = resp.data;
          console.log('esto es pases,', pases, 'esto es gastos', gastos);
          if (success == true) {
            const list_gastos = gastos.map((item: historialVehiculo) => {
              const primerFecha = item.fecha.split(' ');
              const segundaFecha = primerFecha[1].split('-');
              const anioNumero = parseInt(segundaFecha[2]);
              const mesNumero = parseInt(segundaFecha[1]);
              return {
                folio: item.folio,
                solicitante: item.solicitante,
                fecha: item.fecha,
                anio: anioNumero,
                mes: mesNumero,
                tipo: 'Gastos a comprobar',
              };
            });
            const list_pases = pases.map((item: historialVehiculo) => {
              const filtroFecha = item.fecha.split('-');
              const anioNumero = parseInt(filtroFecha[2]);
              const mesNumero = parseInt(filtroFecha[1]);

              return {
                folio: item.folio,
                solicitante: item.solicitante,
                fecha: item.fecha,
                anio: anioNumero,
                mes: mesNumero,
                tipo: 'Pases intermedios',
              };
            });
            this.list_Historial = list_gastos.concat(list_pases);
            this.list_Historial_Filtro = this.list_Historial.filter(
              (x) => x.anio == anioActual && x.mes == mesActual
            );

            this.list_Historial_Filtro.sort((a, b) => {
              if (b.anio !== a.anio) {
                return b.anio - a.anio;
              }

              return b.mes - a.mes;
            });
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadFiltroHistorico(anio: number, mes: number) {
      try {
        this.list_Historial_Filtro = this.list_Historial.filter(
          (x) => x.anio == anio && x.mes == mes
        );
        this.list_Historial_Filtro.sort((a, b) => {
          if (b.anio !== a.anio) {
            return b.anio - a.anio;
          }

          return b.mes - a.mes;
        });
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    //_---------------------------------------------------------------------------------------------------------------------------------

    async loadInformacionObservacion() {
      try {
        const resp = await api.get('/Empleados/ByUsuario');
        if (resp.status == 200) {
          const { data } = resp.data;
          this.observaciones.empleado = data.nombre_Completo;
          this.observaciones.empleado_Id = data.id;
        }

        const idVehiculo = this.vehiculo.id;
        if (idVehiculo !== undefined) {
          this.observaciones.vehiculo_Id = parseInt(idVehiculo.toString());
          this.observaciones.vehiculo = this.vehiculo.nombre;
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async loadObservacionesByVehiculo(id: number) {
      try {
        const resp = await api.get(`/ObservacionesVehiculos/ByVehiculo/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          console.log('Esto es observaciones', data);
          if (success == true) {
            this.list_Historial_Oservaciones = data.map((item: Observacion) => {
              const fecha = item.fecha_Creacion.split('T');
              return {
                id: item.id,
                vehiculo: item.vehiculo,
                empleado: item.empleado,
                asunto: item.asunto,
                observacion: item.observacion,
                foto1_URL: item.foto1_URL,
                foto2_URL: item.foto2_URL,
                atendido: item.atendido,
                fecha_Creacion: fecha[0],
              };
            });
            this.list_Historial_Oservaciones.reverse();
          }
        }
      } catch (error) {
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async createObservacionVehiculos(observacion: Observacion) {
      try {
        let resp = null;
        resp = await api.post('/ObservacionesVehiculos', observacion, {
          headers: {
            'Content-Type': `"multipart/form-data";
                `,
          },
        });
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    async atencionObservacion(id: number) {
      try {
        const resp = await api.get(`/ObservacionesVehiculos/Atendido/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: 'Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte',
        };
      }
    },

    actualizarModal(valor: boolean) {
      this.modal = valor;
    },

    actualizarModalFotografia(valor: boolean) {
      this.modalFoto = valor;
    },

    actualizarModalObservacion(valor: boolean) {
      this.modalObservación = valor;
    },

    //-----------------------------------------------------------------------

    /*async load_Disponibilidad_Autos() {
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
    },*/
  },
});
