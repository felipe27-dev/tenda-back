import { Router } from "express";
import { UsuarioControlador } from "./controller/UsuarioControlador";

const usuarioRotas = Router();
const usuarioControlador = new UsuarioControlador();


//usuarios gerais
usuarioRotas.post("/usuarios/registrar", usuarioControlador.cadastrarControlador);

usuarioRotas.post("/usuarios/login", usuarioControlador.loginControlador);


//admin rotas

//usuarioRotas.get("admin/usuarios/", autenticarJWt, autorizarAdmin, 
// usuarioControlador.usuarios);


export default usuarioRotas;
