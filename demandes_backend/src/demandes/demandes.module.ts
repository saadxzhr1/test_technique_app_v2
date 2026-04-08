import { Module } from '@nestjs/common';
import { DemandesService } from './demandes.service';
import { DemandesController } from './demandes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demandes } from './entities/demande.entity';
import { HistoriqueModule } from 'src/historique/historique.module';
@Module({
  imports: [TypeOrmModule.forFeature([Demandes]), HistoriqueModule],
  controllers: [DemandesController],
  providers: [DemandesService],
})
export class DemandesModule {}
