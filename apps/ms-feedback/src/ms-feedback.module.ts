import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MsFeedbackController } from './ms-feedback.controller';
import { MsFeedbackService } from './ms-feedback.service';
import { Feedback, FeedbackSchema } from './feedback.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password123@localhost:27017/muro_escolar?authSource=admin'),
    
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema }
    ]),
  ],
  controllers: [MsFeedbackController],
  providers: [MsFeedbackService],
})
export class MsFeedbackModule {}