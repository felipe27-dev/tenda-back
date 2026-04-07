import express, { Application } from "express";
import { AppDataSource } from "./src/database/data-source";
import { config } from "./config";
import routesMain from "./src/routes";

export class App {
  private _app: Application;

  constructor() {
    this._app = express();
    this.config();
    this.routes();
  }

  private config() {
    this._app.use(express.json());
  }

  private routes() {
    this._app.use(routesMain);
  }

  private initDatabase() {
    AppDataSource.initialize()
      .then(() => {
        console.log("DataBase connected");
      })
      .catch((error) => {
        console.error("DataBase error", error);
      });
  }

  public listen() {
    this.initDatabase();

    this._app.listen(config.port, () =>
      console.log(`Servidor rodando na porta ${config.port}`),
    );
  }

  public get app() {
    return this._app;
  }
}
