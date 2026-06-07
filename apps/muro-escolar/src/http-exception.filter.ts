import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Determinamos si es un error HTTP conocido o un fallo interno del servidor (500)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Fallo interno en el sistema. Por favor, intente más tarde.';

    // Formateamos la respuesta para que siempre tenga la misma estructura
    response.status(status).json({
      estado: status,
      fecha: new Date().toISOString(),
      ruta: request.url,
      detalle: message,
    });
  }
}