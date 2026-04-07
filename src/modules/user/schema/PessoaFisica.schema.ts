import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario.schema";

@Entity("pessoas_fisicas")
export class PessoaFisica {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 14 })
  cpf!: string;

  @Column({ length: 150 })
  nome!: string;

  @Column({ type: "date" })
  data_nascimento!: Date;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario!: Usuario;
}
