import { NestFactory } from '@nestjs/core';
import { MsFeedbackModule } from './ms-feedback.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MsFeedbackModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    },
  );
  await app.listen();
  console.log('📝 Microservicio de Feedback (TCP) escuchando en puerto 3002');
}
bootstrap();
