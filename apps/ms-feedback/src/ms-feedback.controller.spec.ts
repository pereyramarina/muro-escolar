import { Test, TestingModule } from '@nestjs/testing';
import { MsFeedbackController } from './ms-feedback.controller';
import { MsFeedbackService } from './ms-feedback.service';

describe('MsFeedbackController', () => {
  let msFeedbackController: MsFeedbackController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsFeedbackController],
      providers: [MsFeedbackService],
    }).compile();

    msFeedbackController = app.get<MsFeedbackController>(MsFeedbackController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msFeedbackController.getHello()).toBe('Hello World!');
    });
  });
});
