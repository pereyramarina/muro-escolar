import { Injectable } from '@nestjs/common';

@Injectable()
export class MsReportesService {
  getHello(): string {
    return 'Hello World!';
  }
}
