import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UpdateHandler } from './infrastructure/dynamodb/intializer/updates/update.handler';
import * as dotenv from 'dotenv';
import { JWTHelper } from '@beamar/microlib';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  if (new ConfigService().get('ENV_EXEC_CONF') === 'development_local') {
    dotenv.config({ path: './src/env/envs/development.local.env' });
  } else {
    dotenv.config({ path: './src/env/envs/development.env' });
  }
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Micro Service')
    .setDescription('Micro Service for ecommerce')
    .setVersion('1.0.0')
    .addTag('ecommerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.APP_DOMAIN.split(','),
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Authorization, Accept, xsrfCookie, responseType',
    credentials: true,
  });

  await app.listen(process.env.APP_PORT);
  console.log('BOOTSTRAP');

  JWTHelper.initialize();
  UpdateHandler.esxecuteDynamoUpdates();
}
bootstrap();
