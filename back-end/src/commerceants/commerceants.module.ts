import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceantsService } from './commerceants.service';
import { CommerceantsController } from './commerceants.controller';
import { Commerceant } from './entities/commerceant.entity';
import { Commande } from '../commandes/entities/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commerceant, Commande])],
  controllers: [CommerceantsController],
  providers: [CommerceantsService],
  exports: [CommerceantsService],
})
export class CommerceantsModule {}