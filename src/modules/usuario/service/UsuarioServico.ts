import { IUsuarioRepositorio } from "../repository/IUsuarioRepositorio";
import bcrypt from "bcrypt";
import { UsuarioBaseDTO } from "../dtos/UsuarioBase.DTO";
import { UsuarioLoginDTO } from "../dtos/UsuarioLogin.DTO";
import { UsuarioRespostaDTO } from "../dtos/UsuarioResposta.DTO";
import { config } from "../../../../config";
import jwt from "jsonwebtoken";
import { Endereco } from "../schema/Endereco.schema";

export class UsuarioService {
  constructor(private usuarioRepositorio: IUsuarioRepositorio) {}

  async cadastrar(dados: UsuarioBaseDTO): Promise<UsuarioRespostaDTO> {
    if (!dados.email || !dados.senha || !dados.telefone) {
      throw new Error("Dados obrigatórios faltando.");
    }

    const usuarioExiste = await this.usuarioRepositorio.buscarPorEmail(
      dados.email,
    );

    if (usuarioExiste) {
      throw new Error("Usuário ja existe");
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await this.usuarioRepositorio.criarUsuario({
      email: dados.email,
      telefone: dados.telefone,
      senha: senhaHash,
      cpf: dados.cpf,
      enderecos: dados.enderecos?.map((endereco) =>
        Object.assign(new Endereco(), endereco),
      ),
    });

    return {
      id: usuario.id,
      email: usuario.email,
      telefone: usuario.telefone,
    };
  }

  async login(dados: UsuarioLoginDTO): Promise<string> {
    const usuario = await this.usuarioRepositorio.buscarPorEmail(dados.email);

    if (!usuario) {
      throw new Error("Usuario não existe");
    }

    const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Senha invalida.");
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, papel: usuario.papel },
      config.secret,
      {
        expiresIn: "3h",
      },
    );

    return token;
  }
}
