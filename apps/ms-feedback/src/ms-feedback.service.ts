import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './feedback.schema';

@Injectable()
export class MsFeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  async crearFeedback(datosFeedback: any) {
    const nuevoFeedback = new this.feedbackModel({
      id_obra: Number(datosFeedback.id_obra),
      id_docente: datosFeedback.id_docente,
      calificacion: Number(datosFeedback.calificacion),
      comentario_pedagogico: datosFeedback.comentario 
    });
    
    return await nuevoFeedback.save();
  }

  // Método para leer los documentos
  async obtenerFeedbacks() {
    return await this.feedbackModel.find().exec();
  }
}