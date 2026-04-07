import { UsuarioBaseDTO } from "./UsuarioBase.DTO";

export interface CriarUsuarioPFDTO extends UsuarioBaseDTO {
  tipo_usuario: "PF";

  nome: string;
  cpf: string;
  data_nascimento: Date;
}
