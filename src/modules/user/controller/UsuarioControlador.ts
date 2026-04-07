import { Request, Response } from "express";
import { CriarUsuarioPFDTO } from "../dtos/CriarUsuarioPF.DTO";
import { CriarUsuarioPJDTO } from "../dtos/CriarUsuarioPJ.DTO";
import { UsuarioRepository } from "../repository/UsuarioRepositorio";
import { UsuarioService } from "../service/UsuarioServico";
import { AppDataSource } from "../../../database/data-source";
import { Usuario } from "../schema/Usuario.schema";

const usuarioService = new UsuarioService(
  new UsuarioRepository(AppDataSource.getRepository(Usuario)),
  AppDataSource,
);

export class UsuarioControlador {
  async cadastrar(req: Request, res: Response) {
    try {
      const dados = req.body as CriarUsuarioPFDTO | CriarUsuarioPJDTO;

      const usuario = await usuarioService.cadastrar(dados);

      res.status(200).json({
        user: usuario,
      });
    } catch (error) {
      res.status(400).json({
        err: error,
      });
    }
  }
}
