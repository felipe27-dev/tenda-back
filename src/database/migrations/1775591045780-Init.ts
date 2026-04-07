import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775591045780 implements MigrationInterface {
    name = 'Init1775591045780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoas_fisicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying(14) NOT NULL, "nome" character varying(150) NOT NULL, "data_nascimento" date NOT NULL, "usuarioId" uuid, CONSTRAINT "UQ_236c23ce8609a1b033c0fa1328b" UNIQUE ("cpf"), CONSTRAINT "REL_07de89499da065d18e6bbab3b8" UNIQUE ("usuarioId"), CONSTRAINT "PK_e10473cfb2b1dd3960dafbc3f9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoas_juridicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cnpj" character varying(14) NOT NULL, "razao_social" character varying(50) NOT NULL, "usuarioId" uuid, CONSTRAINT "UQ_ac05540d15de73df79c133ea463" UNIQUE ("cnpj"), CONSTRAINT "UQ_f9c0e243177e14974d4cd158447" UNIQUE ("razao_social"), CONSTRAINT "REL_3200931ac0d3c1bcf5ce0a6fd7" UNIQUE ("usuarioId"), CONSTRAINT "PK_a4e8fa250b65f32b22936ee37b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_tipo_pessoa_enum" AS ENUM('PF', 'PJ')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(150) NOT NULL, "telefone" character varying(25) NOT NULL, "senha" character varying(255) NOT NULL, "papel" character varying NOT NULL DEFAULT 'CLIENTE', "ativo" boolean NOT NULL DEFAULT true, "email_verificado" boolean NOT NULL DEFAULT false, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "tipo_pessoa" "public"."usuarios_tipo_pessoa_enum" NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoas_fisicas" ADD CONSTRAINT "FK_07de89499da065d18e6bbab3b8e" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoas_juridicas" ADD CONSTRAINT "FK_3200931ac0d3c1bcf5ce0a6fd79" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas_juridicas" DROP CONSTRAINT "FK_3200931ac0d3c1bcf5ce0a6fd79"`);
        await queryRunner.query(`ALTER TABLE "pessoas_fisicas" DROP CONSTRAINT "FK_07de89499da065d18e6bbab3b8e"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_tipo_pessoa_enum"`);
        await queryRunner.query(`DROP TABLE "pessoas_juridicas"`);
        await queryRunner.query(`DROP TABLE "pessoas_fisicas"`);
    }

}
