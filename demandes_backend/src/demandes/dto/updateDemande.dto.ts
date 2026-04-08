// import { PartialType } from '@nestjs/mapped-types';
// import { CreateDemandeDto } from './create-demande.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdateDateColumn } from 'typeorm';
import { CreateDemandeDto } from './createDemande.dto';

export class UpdateDemandeDto extends PartialType(CreateDemandeDto) {
  @ApiProperty()
  @UpdateDateColumn()
  date_der_mod?: Date;
}
