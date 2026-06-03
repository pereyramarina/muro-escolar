import { Module } from '@nestjs/common';
import { MsFeedbackController } from './ms-feedback.controller';
import { MsFeedbackService } from './ms-feedback.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './feedback.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password123@127.0.0.1:27017/', {
      dbName: 'muro_escolar_db',
      authSource: 'admin',
    }),
    // Registramos el esquema aquí
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }]),
  ],
  controllers: [MsFeedbackController],
  providers: [MsFeedbackService],
})
export class MsFeedbackModule {}