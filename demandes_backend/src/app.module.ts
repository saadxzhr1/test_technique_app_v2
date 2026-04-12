import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandesModule } from './demandes/demandes.module';
import { DataSource } from 'typeorm';
import { HistoriqueModule } from './historique/historique.module';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

// The root module. It's the starting point of the dependency injection tree.
// NestJS reads it to know what exists in the application.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env file, make variables available
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    DemandesModule,
    HistoriqueModule,
    UtilisateursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    addTransactionalDataSource(dataSource);
  }
}
