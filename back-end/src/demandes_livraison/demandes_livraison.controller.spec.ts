import { Test, TestingModule } from '@nestjs/testing';
import { DemandesLivraisonController } from './demandes_livraison.controller';

describe('DemandesLivraisonController', () => {
  let controller: DemandesLivraisonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandesLivraisonController],
    }).compile();

    controller = module.get<DemandesLivraisonController>(DemandesLivraisonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
