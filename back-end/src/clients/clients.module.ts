import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Commande } from 'src/commandes/entities/commande.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Commande, Commerceant])],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}