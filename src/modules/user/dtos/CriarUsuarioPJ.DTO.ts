import { UsuarioBaseDTO } from "./UsuarioBase.DTO";

export interface CriarUsuarioPJDTO extends UsuarioBaseDTO {
  tipo_usuario: "PJ";

  razao_social: string;
  nome_fantasia?: string;
  cnpj: string;
}
