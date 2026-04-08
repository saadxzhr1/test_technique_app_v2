import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Demandes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column()
  details!: string;

  @Column()
  status!: string;

  @Column()
  supprimer?: boolean;

  @Column()
  date_creation?: Date;

  @Column()
  @UpdateDateColumn()
  date_der_mod?: Date;
}
