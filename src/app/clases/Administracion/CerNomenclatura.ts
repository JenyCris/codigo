export class CerNomenclatura {
  IdCerNomenclatura: number;
  IdTramite: number;
  Consecutivo: number;
  Fecha: string;
  DireccionIgac: string;
  Elaborado: number;
  Revisado: number;
  Jefe: number;
  IdTipoSuelo: number;
  Estado: boolean;


  constructor(IdCerNomenclatura: number,IdTramite: number,Consecutivo: number,
    Fecha: string,DireccionIgac: string,Elaborado: number,Revisado: number,
    Jefe: number, IdTipoSuelo: number, Estado: boolean) {

    this.IdCerNomenclatura = IdCerNomenclatura;
    this.IdTramite = IdTramite;
    this.Consecutivo = Consecutivo;
    this.Fecha = Fecha;
    this.DireccionIgac = DireccionIgac;
    this.Elaborado = Elaborado;
    this.Revisado = Revisado;
    this.Jefe = Jefe;
    this.IdTipoSuelo = IdTipoSuelo;
    this.Estado = Estado;
  }

}
