import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesModule } from './commandes/commandes.module';
import { ClientsModule } from './clients/clients.module';
import { RappelCommandesModule } from './rappel_commandes/rappel_commandes.module';
import { UsersModule } from './users/users.module';
import { CommerceantsModule } from './commerceants/commerceants.module';
import { Commande } from './commandes/entities/commande.entity'
import { RappelCommande } from './rappel_commandes/entities/rappel-commande.entity';
import { Client } from './clients/entities/client.entity';
import { Commerceant } from './commerceants/entities/commerceant.entity';

import { User } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { LivreurModule } from './livreur/livreur.module';
import { Livreur } from './livreur/entity/livreur';
import { LivreurController } from './livreur/livreur.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'posgres',//'1234',
      database: 'delivery_app',
      autoLoadEntities: true, //charge toutes les entités automatiquement
      synchronize: true,      //en dev seulement! génère le schéma auto
      entities: [User, Livreur,Client,Commande,RappelCommande,Commerceant],
    }),
    UsersModule,   
    LivreurModule,
    AuthModule,
    ClientsModule,
    CommandesModule,
    RappelCommandesModule,
    CommerceantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}