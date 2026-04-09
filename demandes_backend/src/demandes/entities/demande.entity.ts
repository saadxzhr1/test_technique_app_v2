import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DemandesStatus } from '../enums/demandesStatus.enum';

@Entity()
export class Demandes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column()
  details!: string;

  @Column({ type: 'enum', enum: DemandesStatus })
  status!: string;

  @Column()
  supprimer?: boolean;

  @Column()
  date_creation?: Date;

  @UpdateDateColumn()
  date_der_mod?: Date;
}
