import { Test, TestingModule } from '@nestjs/testing';
import { MsReportesController } from './ms-reportes.controller';
import { MsReportesService } from './ms-reportes.service';

describe('MsReportesController', () => {
  let msReportesController: MsReportesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsReportesController],
      providers: [MsReportesService],
    }).compile();

    msReportesController = app.get<MsReportesController>(MsReportesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msReportesController.getHello()).toBe('Hello World!');
    });
  });
});
