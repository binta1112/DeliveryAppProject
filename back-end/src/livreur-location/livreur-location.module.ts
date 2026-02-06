import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreurLocation } from './livreur-location.entity';
import { LivreurLocationService } from './livreur-location.service';

@Module({
  imports: [TypeOrmModule.forFeature([LivreurLocation])],
  providers: [LivreurLocationService],
  exports: [LivreurLocationService],
})
export class LivreurLocationModule {}
