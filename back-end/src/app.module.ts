import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesModule } from './commandes/commandes.module';
import { ClientsModule } from './clients/clients.module';
import { RappelCommandesModule } from './rappel_commandes/rappel_commandes.module';
import { UsersModule } from './users/users.module';
import { CommerceantsModule } from './commerceants/commerceants.module';
import { Commande } from './commandes/entities/commande.entity';
import { RappelCommande } from './rappel_commandes/entities/rappel-commande.entity';
import { Client } from './clients/entities/client.entity';
import { Commerceant } from './commerceants/entities/commerceant.entity';
import { User } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { LivreurModule } from './livreur/livreur.module';
import { Livreur } from './livreur/entity/livreur';
import { DemandesLivraisonModule } from './demandes_livraison/demandes_livraison.module';
import { PropositionsPrixModule } from './propositions_prix/propositions_prix.module';
import { DemandeLivraison } from './demandes_livraison/entities/demande-livraison.entity';
import { PropositionPrix } from './propositions_prix/entities/proposition-prix.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'posgres',
      database: 'delivery_app',
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        User,
        Livreur,
        Client,
        Commande,
        RappelCommande,
        Commerceant,
        DemandeLivraison,
        PropositionPrix,
      ],
    }),
    UsersModule,
    LivreurModule,
    AuthModule,
    ClientsModule,
    CommandesModule,
    RappelCommandesModule,
    CommerceantsModule,
    DemandesLivraisonModule,
    PropositionsPrixModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}