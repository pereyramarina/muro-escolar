import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('OBRAS_SERVICE') private clientObras: ClientProxy,
    // NUEVO: Agregamos la inyección del cliente de Feedback
    @Inject('FEEDBACK_SERVICE') private clientFeedback: ClientProxy,
  ) {}

  // --- RUTAS DE OBRAS ---
  @Get('ping-obras')
  pingMicroservicioObras() {
    return this.clientObras.send('get_obras_test', { mensaje: 'Hola!' });
  }

  @Post('obras')
  crearNuevaObra(@Body() body: any) {
    return this.clientObras.send('crear_obra', body);
  }

  @Get('obras')
  obtenerTodasLasObras() {
    return this.clientObras.send('obtener_obras', {});
  }

  // --- NUEVAS RUTAS DE FEEDBACK ---
  @Post('feedback')
  crearNuevoFeedback(@Body() body: any) {
    return this.clientFeedback.send('crear_feedback', body);
  }

  @Get('feedback')
  obtenerTodosLosFeedbacks() {
    return this.clientFeedback.send('obtener_feedbacks', {});
  }
}