import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { Client } from '../clients/entities/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { RappelCommande } from 'src/rappel_commandes/entities/rappel-commande.entity';
import { RappelCommandesModule } from 'src/rappel_commandes/rappel_commandes.module';
@Module({
  imports: [TypeOrmModule.forFeature([Commande, RappelCommande]),
 // ClientsModule, 
  //RappelCommandesModule,
],
  controllers: [CommandesController],
  providers: [CommandesService],
  exports: [CommandesService],
})
export class CommandesModule {}