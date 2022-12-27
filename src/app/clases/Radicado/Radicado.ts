export class Radicado {
  IdRadicado: number;
  IdSolicitud: number;
  RadicadoGeneral: number;
  NombreCompleto: string;
  Cedula: string;
  Telefono: string;
  Direccion: string;
  NumeroCatastro: string;
  Fecha: string;
  IdEstado: number;
  Concepto: string;

  constructor(IdRadicado: number,IdSolicitud: number,RadicadoGeneral: number,NombreCompleto: string,Cedula: string,Telefono: string,Direccion: string,NumeroCatastro: string,
    Fecha: string, IdEstado: number, Concepto: string) {
    this.IdRadicado = IdRadicado;
    this.IdSolicitud = IdSolicitud;
    this.RadicadoGeneral = RadicadoGeneral;
    this.NombreCompleto = NombreCompleto;
    this.Cedula = Cedula;
    this.Telefono = Telefono;
    this.Direccion = Direccion;
    this.NumeroCatastro = NumeroCatastro;
    this.Fecha = Fecha;
    this.IdEstado = IdEstado;
    this.Concepto = Concepto;
  }


}
