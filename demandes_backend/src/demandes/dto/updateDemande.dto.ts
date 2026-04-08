import { PartialType } from '@nestjs/swagger';
import { CreateDemandeDto } from './createDemande.dto';

export class UpdateDemandeDto extends PartialType(CreateDemandeDto) {}
