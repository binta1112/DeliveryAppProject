import { Test, TestingModule } from '@nestjs/testing';
import { PropositionsPrixService } from './propositions_prix.service';

describe('PropositionsPrixService', () => {
  let service: PropositionsPrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropositionsPrixService],
    }).compile();

    service = module.get<PropositionsPrixService>(PropositionsPrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
