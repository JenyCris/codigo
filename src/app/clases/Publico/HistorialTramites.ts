export class HistorialTramites {
  IdTramite: number;
  IdSolicitud: number;
  IdEstado: number;
  Nombre: string;
  Direccion: string;
  Telefono: number;
  Cedula: number;
  NumPredial: string;
  Fecha: string;
  Correo: string;
  NombreEstado: string;
  NombreSolicitud: string;
  css: string;
  css2: string;
  spin: string;
  Consecutivo: number;
  Letra: string;


  constructor(IdTramite: number, IdSolicitud: number, IdEstado: number, Nombre: string, Direccion: string, Telefono: number, Cedula: number, NumPredial: string, Fecha: string, Correo: string, NombreEstado: string, NombreSolicitud: string) {
    this.IdTramite = IdTramite;
    this.IdSolicitud = IdSolicitud;
    this.IdEstado = IdEstado;
    this.Nombre = Nombre;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.Cedula = Cedula;
    this.NumPredial = NumPredial;
    this.Fecha = Fecha;
    this.Correo = Correo;
    this.NombreEstado = NombreEstado;
    this.NombreSolicitud = NombreSolicitud;
    this.css = '';
    this.css2 = '';
    this.spin = '';
    this.Consecutivo = 0;
    this.Letra = null;
  }

}
