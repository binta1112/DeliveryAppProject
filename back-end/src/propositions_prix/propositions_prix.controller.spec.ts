import { Test, TestingModule } from '@nestjs/testing';
import { PropositionsPrixController } from './propositions_prix.controller';

describe('PropositionsPrixController', () => {
  let controller: PropositionsPrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropositionsPrixController],
    }).compile();

    controller = module.get<PropositionsPrixController>(PropositionsPrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
