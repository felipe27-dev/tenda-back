import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Endereco } from "./Endereco.schema";
import { Contrato } from "../../contrato/schema/Contrato.schema";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 25 })
  telefone!: string;

  @Column({ length: 255 })
  senha!: string;

  @Column({ length: 14 })
  cpf!: string;

  @Column({ default: "CLIENTE" })
  papel!: "ADMIN" | "CLIENTE";

  @Column({ default: true })
  ativo!: boolean;

  @Column({ default: false })
  email_verificado!: boolean;

  @CreateDateColumn()
  criado_em!: Date;

  @UpdateDateColumn()
  atualizado_em!: Date;

  @OneToMany(() => Endereco, (endereco) => endereco.usuario, {
    cascade: true,
  })
  enderecos!: Endereco[];

  @OneToMany(() => Contrato, (contrato) => contrato.usuario)
  contratos!: Contrato[];
}
