import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  utilisateur!: string;

  @Column({ type: 'text', nullable: true })
  ancienne_valeur?: string;

  @Column({ type: 'text', nullable: true })
  nouvelle_valeur?: string | null;
}
