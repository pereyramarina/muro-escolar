import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitamos CORS para que Angular pueda conectarse sin problemas
  app.enableCors(); 
  await app.listen(3000);
  console.log('🚀 API Gateway corriendo en http://localhost:3000');
}
bootstrap();