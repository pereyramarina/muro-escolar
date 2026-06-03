import { Injectable } from '@nestjs/common';

@Injectable()
export class MsFeedbackService {
  getHello(): string {
    return 'Hello World!';
  }
}
