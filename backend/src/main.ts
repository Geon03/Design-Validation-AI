import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';  // ✅ THIS LINE WAS MISSING

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // allow frontend calls

  await app.listen(8000);
}
bootstrap();
