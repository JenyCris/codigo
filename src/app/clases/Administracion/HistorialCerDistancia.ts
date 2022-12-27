export class HistorialCerDistancia {
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
  NombreSolicitud: string;
  IdCerDistancia: number;
  Consecutivo: number;
  FechaDistancia: string;
  Distancia: number;
  Lugar: string;
  Elaborado: number;
  Revisado: number;
  Jefe: number;
  IdTipoSuelo: number;
  Estado: boolean;


  constructor(IdTramite: number, IdSolicitud: number, IdEstado: number,
    Nombre: string, Direccion: string, Telefono: number,
    Cedula: number, NumPredial: string, Fecha: string,
    Correo: string, NombreSolicitud: string, IdCerDistancia: number, Consecutivo: number,
    FechaDistancia: string, Distancia: number, Lugar: string, Elaborado: number,
    Revisado: number, Jefe: number, IdTipoSuelo: number, Estado: boolean) {
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
    this.NombreSolicitud = NombreSolicitud;
    this.IdCerDistancia = IdCerDistancia;
    this.Consecutivo = Consecutivo;
    this.FechaDistancia = FechaDistancia;
    this.Distancia = Distancia;
    this.Lugar = Lugar;
    this.Elaborado = Elaborado;
    this.Revisado = Revisado;
    this.Jefe = Jefe;
    this.IdTipoSuelo = IdTipoSuelo;
    this.Estado = Estado;
  }

}
