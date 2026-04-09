import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { Utilisateurs } from './entities/utilisateurs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateurs])],
  providers: [UtilisateursService],
  exports: [UtilisateursService],
})
export class UtilisateursModule {}
