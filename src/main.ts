/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('mainService');
  const app = await NestFactory.create(AppModule);
  async function getPublicIP() {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      logger.log(`http://${data.ip}:3000`);
    } catch (error) {
      logger.error('Error al obtener la IP:', error);
    }
  }
  getPublicIP();
  // cors
  app.enableCors({
    origin: '*', // ⚠ Permite todas las peticiones (considera restringirlo en producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  // Aumentar el límite del tamaño del cuerpo de la solicitud
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
