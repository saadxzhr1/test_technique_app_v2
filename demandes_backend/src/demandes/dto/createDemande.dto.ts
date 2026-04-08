// import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  status!: string;
  //date creation gerrer par db, supprimer par default false par service
}
