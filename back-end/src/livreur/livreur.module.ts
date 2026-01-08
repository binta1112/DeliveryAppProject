import { Module } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livreur } from './entity/livreur';
import { User } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Livreur, User]),
  UsersModule,
],
  providers: [LivreurService],
  controllers: [LivreurController],
  exports: [LivreurService],
})
export class LivreurModule {}
