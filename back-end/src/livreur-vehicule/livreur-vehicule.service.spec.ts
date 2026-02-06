import { Test, TestingModule } from '@nestjs/testing';
import { LivreurVehiculeService } from './livreur-vehicule.service';

describe('LivreurVehiculeService', () => {
  let service: LivreurVehiculeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivreurVehiculeService],
    }).compile();

    service = module.get<LivreurVehiculeService>(LivreurVehiculeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
