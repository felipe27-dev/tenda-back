import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PessoaFisica } from "./PessoaFisica.schema";
import { PessoaJuridica } from "./PessoaJuridica.schema";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 25 })
  telefone!: string;

  @Column({ length: 255 })
  senha?: string;

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

  @Column({
    type: "enum",
    enum: ["PF", "PJ"],
  })
  tipo_pessoa!: "PF" | "PJ";

  @OneToOne(() => PessoaFisica, (pf) => pf.usuario)
  pessoaFisica?: PessoaFisica;

  @OneToOne(() => PessoaJuridica, (pj) => pj.usuario)
  pessoaJuridica?: PessoaJuridica;
}
