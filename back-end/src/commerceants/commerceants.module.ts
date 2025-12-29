import { Module } from '@nestjs/common';
import { CommerceantsService } from './commerceants.service';
import { CommerceantsController } from './commerceants.controller';

@Module({
  providers: [CommerceantsService],
  controllers: [CommerceantsController]
})
export class CommerceantsModule {}
