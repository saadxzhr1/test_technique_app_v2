import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DemandesStatus } from '../enums/demandesStatus.enum';

export class CreateDemandeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  titre!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  details!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DemandesStatus)
  status!: string;

  //date creation gerrer par db, supprimer = par default false par service
}
