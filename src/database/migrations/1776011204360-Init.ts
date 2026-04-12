import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776011204360 implements MigrationInterface {
    name = 'Init1776011204360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "logradouro" character varying(150) NOT NULL, "numero" character varying(10) NOT NULL, "bairro" character varying(100) NOT NULL, "cidade" character varying(100) NOT NULL, "usuario_id" uuid NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(150) NOT NULL, "telefone" character varying(25) NOT NULL, "senha" character varying(255) NOT NULL, "cpf" character varying(14) NOT NULL, "papel" character varying NOT NULL DEFAULT 'CLIENTE', "ativo" boolean NOT NULL DEFAULT true, "email_verificado" boolean NOT NULL DEFAULT false, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD CONSTRAINT "FK_702a2d47c2a196c1c8596dbf2b5" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enderecos" DROP CONSTRAINT "FK_702a2d47c2a196c1c8596dbf2b5"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
