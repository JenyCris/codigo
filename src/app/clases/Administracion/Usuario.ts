export class Usuario {

  IdUsuario: number;
  NombreCompleto: string;
  Cedula: string;
  Telefono: string;
  Username: string;
  Clave: string;


  constructor(IdUsuario: number, NombreCompleto: string, Cedula: string, Telefono: string, Username: string, Clave: string) {
    this.IdUsuario = IdUsuario;
    this.NombreCompleto = NombreCompleto;
    this.Cedula = Cedula;
    this.Telefono = Telefono;
    this.Username = Username;
    this.Clave = Clave;
  }

}
