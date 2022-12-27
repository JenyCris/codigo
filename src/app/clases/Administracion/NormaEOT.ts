export class NormaEOT {
  IdNormaEOT: number;
  FechaNorma: string;
  IdTipoSuelo: number;
  Titulo: string;
  Contenido: string;
  Estado: boolean;


  constructor(IdNormaEOT: number,FechaNorma: string,IdTipoSuelo: number,Titulo: string,Contenido: string,Estado: boolean) {
    this.IdNormaEOT = IdNormaEOT;
    this.FechaNorma = FechaNorma;
    this.IdTipoSuelo = IdTipoSuelo;
    this.Titulo = Titulo;
    this.Contenido = Contenido;
    this.Estado = Estado;
  }

}
