import { Module } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';
import { CouriersController } from './couriers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livreur } from './entity/livreur';
import { User } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { LivreurVehiculeImage } from './livreur-vehicule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livreur, User, LivreurVehiculeImage]),
  UsersModule,
],
  providers: [LivreurService],
  controllers: [LivreurController, CouriersController],
  exports: [LivreurService],
})
export class LivreurModule {}
