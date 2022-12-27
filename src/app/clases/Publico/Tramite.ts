export class Tramite {
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


  constructor(IdTramite: number, IdSolicitud: number, IdEstado: number, Nombre: string, Direccion: string, Telefono: number, Cedula: number, NumPredial: string, Fecha: string, Correo: string) {
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
  }

}
