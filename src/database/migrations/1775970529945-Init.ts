import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775970529945 implements MigrationInterface {
    name = 'Init1775970529945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(150) NOT NULL, "telefone" character varying(25) NOT NULL, "senha" character varying(255) NOT NULL, "cpf" character varying(14) NOT NULL, "cep" character varying(8) NOT NULL, "papel" character varying NOT NULL DEFAULT 'CLIENTE', "ativo" boolean NOT NULL DEFAULT true, "email_verificado" boolean NOT NULL DEFAULT false, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
