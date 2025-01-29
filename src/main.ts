import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`El puerto de Api seria => http://localhost:${3000}` );  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
