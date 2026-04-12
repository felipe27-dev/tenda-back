import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ length: 8 })
  cep!: string;

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
}
