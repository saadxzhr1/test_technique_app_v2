import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: 'http://localhost:4200' }); // allow requests from this source

  // Configurer Swagger
  const config = new DocumentBuilder()
    .setTitle('Demandes example')
    .setDescription('The demandes API description')
    .setVersion('1.0')
    .addTag('Demandes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Http server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
