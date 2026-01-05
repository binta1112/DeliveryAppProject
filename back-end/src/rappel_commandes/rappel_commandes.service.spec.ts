import { Test, TestingModule } from '@nestjs/testing';
import { RappelCommandesService } from './rappel_commandes.service';

describe('RappelCommandesService', () => {
  let service: RappelCommandesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RappelCommandesService],
    }).compile();

    service = module.get<RappelCommandesService>(RappelCommandesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
