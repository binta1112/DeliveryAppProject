import { Test, TestingModule } from '@nestjs/testing';
import { RappelCommandesController } from './rappel_commandes.controller';

describe('RappelCommandesController', () => {
  let controller: RappelCommandesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RappelCommandesController],
    }).compile();

    controller = module.get<RappelCommandesController>(RappelCommandesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
