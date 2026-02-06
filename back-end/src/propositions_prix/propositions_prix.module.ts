import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropositionPrix } from './entities/proposition-prix.entity';
import { PropositionsPrixService } from './propositions_prix.service';
import { PropositionsPrixController } from './propositions_prix.controller';
import { DemandeLivraison } from 'src/demandes_livraison/entities/demande-livraison.entity';
import { Livreur } from 'src/livreur/entity/livreur';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([PropositionPrix, DemandeLivraison, Livreur]),
    NotificationsModule,
  ],
  providers: [PropositionsPrixService],
  controllers: [PropositionsPrixController],
  exports: [PropositionsPrixService],
})
export class PropositionsPrixModule {}