import { Router } from "express";
import usuarioRotas from "./modules/user/rotasUsuario";

const routesMain = Router();

routesMain.use(usuarioRotas);

export default routesMain;
