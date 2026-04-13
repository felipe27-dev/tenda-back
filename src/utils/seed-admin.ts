import "reflect-metadata";
import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source";
import { Usuario } from "../modules/usuario/schema/Usuario.schema";

async function seedAdmin() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Usuario);

  const adminExistente = await repo.findOne({
    where: { email: "admin@email.com" },
  });

  if (adminExistente) {
    console.log("Admin já existe.");
    return;
  }

  const senhaHash = await bcrypt.hash("admin123", 10);

  const admin = repo.create({
    email: "admin@email.com",
    telefone: "67999999999",
    senha: senhaHash,
    cpf: "00000000000",
    papel: "ADMIN",
    email_verificado: true,
  });

  await repo.save(admin);
  console.log("Administrador criado com sucesso!");
  process.exit();
}

seedAdmin();
