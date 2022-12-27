export class HistorialCerNomenclatura {
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
  IdCerNomenclatura: number;
  Consecutivo: number;
  FechaNomenclatura: string;
  DireccionIgac: string;
  Elaborado: number;
  Revisado: number;
  Jefe: number;
  IdTipoSuelo: number;
  Estado: boolean;


  constructor(IdTramite: number, IdSolicitud: number, IdEstado: number,
    Nombre: string, Direccion: string, Telefono: number,
    Cedula: number, NumPredial: string, Fecha: string,
    Correo: string, NombreSolicitud: string,IdCerNomenclatura: number,Consecutivo: number,
    FechaNomenclatura: string, DireccionIgac: string, Elaborado: number,
    Revisado: number,Jefe: number,IdTipoSuelo: number,Estado: boolean) {
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
    this.IdCerNomenclatura = IdCerNomenclatura;
    this.Consecutivo = Consecutivo;
    this.FechaNomenclatura = FechaNomenclatura;
    this.DireccionIgac = DireccionIgac;
    this.Elaborado = Elaborado;
    this.Revisado = Revisado;
    this.Jefe = Jefe;
    this.IdTipoSuelo = IdTipoSuelo;
    this.Estado = Estado;
  }

}
