import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('OBRAS_SERVICE') private clientObras: ClientProxy,
    @Inject('FEEDBACK_SERVICE') private clientFeedback: ClientProxy,
    // NUEVO: Agregamos la inyección del cliente de Reportes
    @Inject('REPORTES_SERVICE') private clientReportes: ClientProxy,
  ) {}

  // --- RUTA DE OBRAS ---
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

  // --- RUTA DE FEEDBACK ---
  @Post('feedback')
  crearNuevoFeedback(@Body() body: any) {
    return this.clientFeedback.send('crear_feedback', body);
  }

  @Get('feedback')
  obtenerTodosLosFeedbacks() {
    return this.clientFeedback.send('obtener_feedbacks', {});
  }

  // --- RUTA DE REPORTES ---
  @Get('reportes')
  obtenerReporteEstadistico() {
    return this.clientReportes.send('obtener_reporte_general', {});
  }
}