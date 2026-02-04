import { Test, TestingModule } from '@nestjs/testing';
import { DemandesLivraisonService } from './demandes_livraison.service';

describe('DemandesLivraisonService', () => {
  let service: DemandesLivraisonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemandesLivraisonService],
    }).compile();

    service = module.get<DemandesLivraisonService>(DemandesLivraisonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
