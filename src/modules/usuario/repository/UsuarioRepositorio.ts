import { Repository } from "typeorm";
import { Usuario } from "../schema/Usuario.schema";
import { IUsuarioRepositorio } from "./IUsuarioRepositorio";

export class UsuarioRepository implements IUsuarioRepositorio {
  
  constructor(private repositorio: Repository<Usuario>) {}

  async criarUsuario(dados: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.repositorio.create(dados);
    await this.repositorio.save(usuario);

    return usuario;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const user = this.repositorio.findOne({
      where: { email },
    });

    return user;
  }
}
