import { Module } from '@nestjs/common';
import { MsReportesController } from './ms-reportes.controller';
import { MsReportesService } from './ms-reportes.service';

@Module({
  imports: [],
  controllers: [MsReportesController],
  providers: [MsReportesService],
})
export class MsReportesModule {}
