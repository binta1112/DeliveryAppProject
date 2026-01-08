import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { UsersModule } from 'src/users/users.module';
import { Commande } from 'src/commandes/entities/commande.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';
import { CommerceantsModule } from 'src/commerceants/commerceants.module';
import { CommandesModule } from 'src/commandes/commandes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client,Commande]),
  UsersModule,
 // CommerceantsModule,
  CommandesModule
],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
