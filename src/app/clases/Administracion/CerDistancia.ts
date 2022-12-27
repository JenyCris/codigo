export class CerDistancia {
  IdCerDistancia: number;
  IdTramite: number;
  Consecutivo: number;
  Fecha: string;
  Distancia: number;
  Lugar: string;
  Elaborado: number;
  Revisado: number;
  Jefe: number;
  IdTipoSuelo: number;
  Estado: boolean;


  constructor(IdCerDistancia: number, IdTramite: number, Consecutivo: number,
    Fecha: string, Distancia: number, Lugar: string, Elaborado: number, Revisado: number,
    Jefe: number, IdTipoSuelo: number, Estado: boolean) {

    this.IdCerDistancia = IdCerDistancia;
    this.IdTramite = IdTramite;
    this.Consecutivo = Consecutivo;
    this.Fecha = Fecha;
    this.Distancia = Distancia;
    this.Lugar = Lugar;
    this.Elaborado = Elaborado;
    this.Revisado = Revisado;
    this.Jefe = Jefe;
    this.IdTipoSuelo = IdTipoSuelo;
    this.Estado = Estado;
  }

}
