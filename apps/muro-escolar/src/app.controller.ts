import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('OBRAS_SERVICE') private clientObras: ClientProxy) {}

  @Get('ping-obras')
  pingMicroservicioObras() {
    return this.clientObras.send('get_obras_test', { mensaje: 'Hola!' });
  }

  @Post('obras')
  crearNuevaObra(@Body() body: any) {
    return this.clientObras.send('crear_obra', body);
  }

  // RUTA NUEVA: Endpoint GET para listar los registros
  @Get('obras')
  obtenerTodasLasObras() {
    return this.clientObras.send('obtener_obras', {});
  }
}