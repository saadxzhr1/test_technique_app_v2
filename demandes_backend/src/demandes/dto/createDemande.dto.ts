// import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn } from 'typeorm';

export class CreateDemandeDto {
  @ApiProperty()
  titre!: string;

  @ApiProperty()
  details!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  @CreateDateColumn()
  date_der_mod?: Date;

  //date creation gerrer par db, supprimer par default false par service
}
