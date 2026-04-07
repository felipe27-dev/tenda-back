import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario.schema";

@Entity("pessoas_juridicas")
export class PessoaJuridica {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 14 })
  cnpj!: string;

  @Column({ unique: true, length: 50 })
  razao_social!: string;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario!: Usuario;
}
