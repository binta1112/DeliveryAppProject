import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceantsService } from './commerceants.service';
import { CommerceantsController } from './commerceants.controller';
import { Commerceant } from './entities/commerceant.entity';
import { User } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Client } from 'src/clients/entities/client.entity';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Commerceant,Client,User]),
  UsersModule,
  ClientsModule,
],
  controllers: [CommerceantsController],
  providers: [CommerceantsService],
  exports: [CommerceantsService],
})
export class CommerceantsModule {}