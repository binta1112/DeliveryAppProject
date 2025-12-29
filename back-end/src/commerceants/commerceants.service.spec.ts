import { Test, TestingModule } from '@nestjs/testing';
import { CommerceantsService } from './commerceants.service';

describe('CommerceantsService', () => {
  let service: CommerceantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommerceantsService],
    }).compile();

    service = module.get<CommerceantsService>(CommerceantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
