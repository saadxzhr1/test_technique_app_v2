import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DemandesService } from './demandes.service';
import { CreateDemandeDto } from './dto/createDemande.dto';
import { UpdateDemandeDto } from './dto/updateDemande.dto';
import { DemandesResponseDto } from './dto/demandesResponse.dto';
@Controller('demandes')
export class DemandesController {
  constructor(private readonly demandesService: DemandesService) {}

  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandesService.create(createDemandeDto);
  }

  @Get()
  async findAll(): Promise<DemandesResponseDto[]> {
    return await this.demandesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.demandesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDemandeDto: UpdateDemandeDto,
  ) {
    return this.demandesService.update(id, updateDemandeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.demandesService.remove(id);
  }
}
