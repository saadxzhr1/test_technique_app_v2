import { Expose } from 'class-transformer';

export class HistoriqueResponseDto {
  @Expose()
  id!: number;

  @Expose()
  date_creation!: Date;

  @Expose()
  type_action!: string;

  @Expose()
  id_demande!: number;

  @Expose()
  utilisateur!: string;

  @Expose()
  ancienne_valeur?: string | null;

  @Expose()
  nouvelle_valeur?: string | null;
}
