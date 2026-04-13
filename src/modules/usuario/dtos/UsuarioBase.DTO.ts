import { EnderecoDTO } from "./Endereco.DTO";

export interface UsuarioBaseDTO {
  email: string;
  telefone: string;
  senha: string;
  cpf: string;
  enderecos: EnderecoDTO[];
}
