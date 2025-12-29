import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesModule } from './commandes/commandes.module';
import { ClientsModule } from './clients/clients.module';
import { RappelCommandesModule } from './rappel_commandes/rappel_commandes.module';
import { UsersModule } from './users/users.module';
import { CommerceantsModule } from './commerceants/commerceants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'delivery_app',
      autoLoadEntities: true, //charge toutes les entités automatiquement
      synchronize: true,      //en dev seulement! génère le schéma auto
    }),

    UsersModule,
    ClientsModule,
    CommandesModule,
    RappelCommandesModule,
    CommerceantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}