import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/UsuarioRepositorio";
import { UsuarioService } from "../service/UsuarioServico";
import { AppDataSource } from "../../../database/data-source";
import { Usuario } from "../schema/Usuario.schema";
import { UsuarioBaseDTO } from "../dtos/UsuarioBase.DTO";
import { UsuarioLoginDTO } from "../dtos/UsuarioLogin.DTO";

const usuarioService = new UsuarioService(
  new UsuarioRepository(AppDataSource.getRepository(Usuario)),
);

export class UsuarioControlador {
  async cadastrarControlador(req: Request, res: Response) {
    try {
      const dados = req.body as UsuarioBaseDTO;

      const usuario = await usuarioService.cadastrar(dados);

      console.log("adada")

      res.status(200).json({
        user: usuario,
      });
    } catch (error) {
      res.status(400).json({
        err: "O cadastro deu errado pae",
      });
    }
  }

  async loginControlador(req: Request, res: Response) {
    try {
      const dados = req.body as UsuarioLoginDTO;

      const token = await usuarioService.login(dados);

      res.status(200).json({
        mensagem: "Deu certo o login, toma seu token",
        token: token,
      });
    } catch (error) {
      res.status(400).json({
        mensagem: "deu nao pae",
      });
    }
  }
}
