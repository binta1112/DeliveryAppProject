import { Test, TestingModule } from '@nestjs/testing';
import { CommerceantsController } from './commerceants.controller';

describe('CommerceantsController', () => {
  let controller: CommerceantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommerceantsController],
    }).compile();

    controller = module.get<CommerceantsController>(CommerceantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
