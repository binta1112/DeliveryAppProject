import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RappelCommande } from './entities/rappel-commande.entity';
import { RappelCommandesService } from './rappel_commandes.service';
import { RappelCommandesController } from './rappel_commandes.controller';
import { Commande } from '../commandes/entities/commande.entity';
import { CommandesModule } from 'src/commandes/commandes.module';

@Module({
  imports: [TypeOrmModule.forFeature([RappelCommande, Commande]),
  CommandesModule,
],
  controllers: [RappelCommandesController],
  providers: [RappelCommandesService],
  exports: [RappelCommandesService],
})
export class RappelCommandesModule {}