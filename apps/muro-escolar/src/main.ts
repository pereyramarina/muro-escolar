  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { ValidationPipe } from '@nestjs/common';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    
    app.enableCors({
      origin: 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,             
        forbidNonWhitelisted: true,  
        transform: true,             
      }),
    );

    await app.listen(3000);
    console.log('🚀 API Gateway escuchando de forma segura en puerto 3000');
  }
  bootstrap();