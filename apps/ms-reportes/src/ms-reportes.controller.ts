import { Controller, Get } from '@nestjs/common';
import { MsReportesService } from './ms-reportes.service';

@Controller()
export class MsReportesController {
  constructor(private readonly msReportesService: MsReportesService) {}

  @Get()
  getHello(): string {
    return this.msReportesService.getHello();
  }
}
