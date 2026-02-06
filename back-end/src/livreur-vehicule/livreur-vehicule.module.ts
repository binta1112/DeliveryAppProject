import { Module } from '@nestjs/common';
import { LivreurVehiculeService } from './livreur-vehicule.service';
import { LivreurVehiculeImage } from 'src/livreur/livreur-vehicule.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([LivreurVehiculeImage])], 
  providers: [LivreurVehiculeService],
  exports: [LivreurVehiculeService],
})
export class LivreurVehiculeModule {}
