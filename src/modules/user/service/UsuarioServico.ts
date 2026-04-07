import { DataSource } from "typeorm";
import { IUsuarioRepositorio } from "../repository/IUsuarioRepositorio";
import { CriarUsuarioPFDTO } from "../dtos/CriarUsuarioPF.DTO";
import { CriarUsuarioPJDTO } from "../dtos/CriarUsuarioPJ.DTO";
import { Usuario } from "../schema/Usuario.schema";
import bcrypt from "bcrypt";
import { PessoaFisica } from "../schema/PessoaFisica.schema";
import { PessoaJuridica } from "../schema/PessoaJuridica.schema";

export class UsuarioService {
  constructor(
    private usuarioRepositorio: IUsuarioRepositorio,
    private dataSource: DataSource,
  ) {}

  async cadastrar(
    dados: CriarUsuarioPFDTO | CriarUsuarioPJDTO,
  ): Promise<Usuario> {
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

    return await this.dataSource.transaction(async (manager) => {
      const usuario = manager.create(Usuario, {
        email: dados.email,
        telefone: dados.telefone,
        senha: senhaHash,
        tipo_pessoa: dados.tipo_usuario,
      });

      await manager.save(usuario);

      if (dados.tipo_usuario == "PF") {
        const dadosPF = dados as CriarUsuarioPFDTO;

        const pf = manager.create(PessoaFisica, {
          cpf: dadosPF.cpf,
          nome: dadosPF.nome,
          usuario: usuario,
          data_nascimento: dadosPF.data_nascimento,
        });

        await manager.save(pf);
      }

      if (dados.tipo_usuario == "PJ") {
        const dadosPJ = dados as CriarUsuarioPJDTO;

        const pj = manager.create(PessoaJuridica, {
          cnpj: dadosPJ.cnpj,
          razao_social: dadosPJ.razao_social,
          usuario: usuario,
        });

        await manager.save(pj);
      }

      delete usuario.senha;

      return usuario;
    });
  }
}
