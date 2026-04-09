import { Utilisateurs } from 'src/utilisateurs/entities/utilisateurs.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Historique {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  date_creation!: Date;

  @Column()
  type_action!: string;

  @Column()
  id_demande!: number;

  @ManyToOne(() => Utilisateurs, { eager: true })
  @JoinColumn({ name: 'utilisateur' })
  utilisateur!: Utilisateurs;

  @Column({ type: 'text', nullable: true })
  ancienne_valeur?: string;

  @Column({ type: 'text', nullable: true })
  nouvelle_valeur?: string | null;
}
