import { Router } from "express";
import { UsuarioControlador } from "./controller/UsuarioControlador";

const usuarioRotas = Router();
const usuarioControlador = new UsuarioControlador();

usuarioRotas.post("/usuarios/registrar", usuarioControlador.cadastrar);

//dadadasfsr\gergedthaethaethaethehegra

export default usuarioRotas;
