import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingGateway } from './tracking.gateway';
import { TrackingService } from './tracking.service';
import { Commande } from '../commandes/entities/commande.entity';
import { LivreurLocationModule } from '../livreur-location/livreur-location.module';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DriverSimulatorService } from './driver-simulator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande]),
    LivreurLocationModule,
    JwtModule.register({
  secret: process.env.JWT_ACCESS_SECRET || 'mySecretKey',
}),
    ConfigModule, // pour accéder aux variables d'environnement
  ],
  providers: [TrackingGateway, TrackingService, WsJwtGuard,DriverSimulatorService,],
})
export class TrackingModule {}
