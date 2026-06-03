import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MsFeedbackService } from './ms-feedback.service';

@Controller()
export class MsFeedbackController {
  constructor(private readonly msFeedbackService: MsFeedbackService) {}

  // Interceptor para guardar datos
  @MessagePattern('crear_feedback')
  async handleCrearFeedback(@Payload() data: any) {
    console.log('Guardando feedback en MongoDB...', data);
    const feedbackGuardado = await this.msFeedbackService.crearFeedback(data);
    return { status: 'Éxito', feedback: feedbackGuardado };
  }

  // Interceptor para leer datos
  @MessagePattern('obtener_feedbacks')
  async handleObtenerFeedbacks() {
    console.log('Consultando feedbacks en MongoDB...');
    const feedbacks = await this.msFeedbackService.obtenerFeedbacks();
    return { status: 'Éxito', total: feedbacks.length, datos: feedbacks };
  }
}