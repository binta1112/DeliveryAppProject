import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { RappelCommande } from 'src/rappel_commandes/entities/rappel-commande.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande, RappelCommande, Client, Commerceant])],
  controllers: [CommandesController],
  providers: [CommandesService],
  exports: [CommandesService],
})
export class CommandesModule {}