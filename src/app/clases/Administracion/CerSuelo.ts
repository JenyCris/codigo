export class CerSuelo {

  IdCerUsoSuelo: number;
  IdTramite: number;
  Consecutivo: number;
  Fecha: string;
  DireccionIgac: string;
  Elaborado: number;
  Revisado: number;
  Jefe: number;
  IdTipoSuelo: number;
  Estado: boolean;
  IdNormaEOT: number;

  Nombre: string;
  Direccion: string;
  Telefono: number;
  Cedula: number;
  NumPredial: string;
  Correo: string;


  constructor(IdCerUsoSuelo: number, IdTramite: number, Consecutivo: number,
    Fecha: string, DireccionIgac: string, Elaborado: number, Revisado: number,
    Jefe: number, IdTipoSuelo: number, Estado: boolean, IdNormaEOT: number, Nombre: string,
    Direccion: string, Telefono: number, Cedula: number, NumPredial: string, Correo: string) {

    this.IdCerUsoSuelo = IdCerUsoSuelo;
    this.IdTramite = IdTramite;
    this.Consecutivo = Consecutivo;
    this.Fecha = Fecha;
    this.DireccionIgac = DireccionIgac;
    this.Elaborado = Elaborado;
    this.Revisado = Revisado;
    this.Jefe = Jefe;
    this.IdTipoSuelo = IdTipoSuelo;
    this.Estado = Estado;
    this.IdNormaEOT = IdNormaEOT;
    this.Nombre = Nombre;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.Cedula = Cedula;
    this.NumPredial = NumPredial;
    this.Correo = Correo;
  }




}
