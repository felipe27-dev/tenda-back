import { Router } from "express";
import usuarioRotas from "./modules/usuario/rotasUsuario";
import contratoRotas from "./modules/contrato/routesContrato";

const routesMain = Router();

routesMain.use(usuarioRotas);
routesMain.use(contratoRotas);

export default routesMain;
