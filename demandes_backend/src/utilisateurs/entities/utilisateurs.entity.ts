import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Utilisateurs {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom_utilisateur!: string;
}
