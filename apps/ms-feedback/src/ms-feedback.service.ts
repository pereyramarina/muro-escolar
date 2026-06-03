import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './feedback.schema';

@Injectable()
export class MsFeedbackService {
  constructor(
    // Inyectamos el modelo de Mongoose
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  // Método para guardar un nuevo documento en MongoDB
  async crearFeedback(datosFeedback: any) {
    const nuevoFeedback = new this.feedbackModel(datosFeedback);
    return await nuevoFeedback.save();
  }

  // Método para leer los documentos (ya lo dejamos listo)
  async obtenerFeedbacks() {
    return await this.feedbackModel.find().exec();
  }
}