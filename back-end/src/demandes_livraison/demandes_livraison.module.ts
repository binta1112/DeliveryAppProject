import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeLivraison } from './entities/demande-livraison.entity';
import { DemandesLivraisonService } from './demandes_livraison.service';
import { DemandesLivraisonController } from './demandes_livraison.controller';
import { Commande } from 'src/commandes/entities/commande.entity';
import { PropositionPrix } from 'src/propositions_prix/entities/proposition-prix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DemandeLivraison, Commande, PropositionPrix])],
  controllers: [DemandesLivraisonController],
  providers: [DemandesLivraisonService],
  exports: [DemandesLivraisonService],
})
export class DemandesLivraisonModule {}