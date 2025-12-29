import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RappelCommande } from './entities/rappel-commande.entity';
import { RappelCommandesService } from './rappel_commandes.service';
import { RappelCommandesController } from './rappel_commandes.controller';
import { Commande } from '../commandes/entities/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RappelCommande, Commande])],
  controllers: [RappelCommandesController],
  providers: [RappelCommandesService],
  exports: [RappelCommandesService],
})
export class RappelCommandesModule {}