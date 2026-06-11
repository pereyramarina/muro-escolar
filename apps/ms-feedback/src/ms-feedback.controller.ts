import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MsFeedbackService } from './ms-feedback.service';
import { CrearFeedbackDto } from './dto/crear-feedback.dto';

@Controller()
export class MsFeedbackController {
  constructor(private readonly msFeedbackService: MsFeedbackService) {}

  // Interceptor para guardar datos
  @MessagePattern('crear_feedback')
  async handleCrearFeedback(@Payload() data: CrearFeedbackDto) {
    console.log('Guardando feedback en la base de datos relacional...', data);
    const feedbackGuardado = await this.msFeedbackService.crearFeedback(data);
    return { status: 'Éxito', feedback: feedbackGuardado };
  }

  // Interceptor para leer datos
  @MessagePattern('obtener_feedbacks')
  async handleObtenerFeedbacks() {
    console.log('Consultando el historial de feedbacks en BD...');
    const feedbacks = await this.msFeedbackService.obtenerFeedbacks();
    return { status: 'Éxito', total: feedbacks.length, datos: feedbacks };
  }
}