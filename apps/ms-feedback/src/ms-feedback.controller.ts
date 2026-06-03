import { Controller, Get } from '@nestjs/common';
import { MsFeedbackService } from './ms-feedback.service';

@Controller()
export class MsFeedbackController {
  constructor(private readonly msFeedbackService: MsFeedbackService) {}

  @Get()
  getHello(): string {
    return this.msFeedbackService.getHello();
  }
}
