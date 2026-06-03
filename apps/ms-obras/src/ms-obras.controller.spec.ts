import { Test, TestingModule } from '@nestjs/testing';
import { MsObrasController } from './ms-obras.controller';
import { MsObrasService } from './ms-obras.service';

describe('MsObrasController', () => {
  let msObrasController: MsObrasController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsObrasController],
      providers: [MsObrasService],
    }).compile();

    msObrasController = app.get<MsObrasController>(MsObrasController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msObrasController.getHello()).toBe('Hello World!');
    });
  });
});
