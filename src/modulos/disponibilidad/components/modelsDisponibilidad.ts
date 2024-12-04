export interface Day {
  date: string;
  dayOfWeek: string;
}

export interface Events {
  vehiculo: string;
  resourceId: string;
  day: string;
  date: string;
}
export interface Pase {
  vehiculo: string;
  pases: string[];
  solicitudes: string[];
}

export interface Vehiculo {
  label: string;
  value: number;
  vehiculo: string;
}
