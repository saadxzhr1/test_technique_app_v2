// 1. user-response.dto.ts
import { Expose, Exclude } from 'class-transformer';
import { CreateDemandeDto } from './createDemande.dto';

export class DemandesResponseDto extends CreateDemandeDto {
  @Expose() id!: number;
  @Expose() date_creation?: Date;
}
