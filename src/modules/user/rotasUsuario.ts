import { Router } from "express";
import { UsuarioControlador } from "./controller/UsuarioControlador";

const usuarioRotas = Router();
const usuarioControlador = new UsuarioControlador();

usuarioRotas.post("/usuarios/registrar", usuarioControlador.cadastrarControlador);

usuarioRotas.post("/usuarios/login", usuarioControlador.loginControlador);

//usuarioRotas.post("/usuario/contratos", middleware, usuarioControlador.contratos);


export default usuarioRotas;
