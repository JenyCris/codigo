export class Permisos {
  IdUsuario: number;
  IdModulo: number;
  IdComponente: number;
  Estado: boolean;


  constructor(IdUsuario: number, IdModulo: number, IdComponente: number, Estado: boolean) {
    
    this.IdUsuario = IdUsuario;
    this.IdModulo = IdModulo;
    this.IdComponente = IdComponente;
    this.Estado = Estado;
  }
}
