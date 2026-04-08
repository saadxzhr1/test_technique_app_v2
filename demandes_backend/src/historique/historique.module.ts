import { Module } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { HistoriqueController } from './historique.controller';
import { Historique } from './entities/historique.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Historique])],
  controllers: [HistoriqueController],
  providers: [HistoriqueService],
  exports: [HistoriqueService],
})
export class HistoriqueModule {}
