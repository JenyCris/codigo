export class ListaRadicado {
  IdRadicado: number;
  IdSolicitud: number;
  RadicadoGeneral: number;
  NombreCompleto: string;
  Cedula: string;
  Telefono: string;
  Direccion: string;
  NumeroCatastro: string;
  Fecha: string;
  NombreSolicitud: string;
  IdEstado: number;
  NombreEstado: string;
  Concepto: string;

  constructor(IdRadicado: number, IdSolicitud: number, RadicadoGeneral: number, NombreCompleto: string, Cedula: string, Telefono: string, Direccion: string, NumeroCatastro: string,
    Fecha: string, NombreSolicitud: string, IdEstado: number, NombreEstado: string, Concepto: string) {
    this.IdRadicado = IdRadicado;
    this.IdSolicitud = IdSolicitud;
    this.RadicadoGeneral = RadicadoGeneral;
    this.NombreCompleto = NombreCompleto;
    this.Cedula = Cedula;
    this.Telefono = Telefono;
    this.Direccion = Direccion;
    this.NumeroCatastro = NumeroCatastro;
    this.Fecha = Fecha;
    this.NombreSolicitud = NombreSolicitud;
    this.IdEstado = IdEstado;
    this.NombreEstado = NombreEstado;
    this.Concepto = Concepto;
  }


}
