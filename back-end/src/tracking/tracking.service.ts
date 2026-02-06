import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from '../commandes/entities/commande.entity';
import { LivreurLocationService } from '../livreur-location/livreur-location.service';
import { DriverLocationDto } from './dto/driver-location.dto';

type JwtUser = {
  sub: string;           // id user
  role: 'courier' | 'seller';
};

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepo: Repository<Commande>,
    private readonly livreurLocationService: LivreurLocationService,
  ) {}

  private async getCommandeOrThrow(orderId: string) {
    const cmd = await this.commandeRepo.findOne({ where: { id: orderId } as any });
    if (!cmd) throw new NotFoundException('COMMANDE_NOT_FOUND');
    return cmd;
  }

  // READ: qui peut suivre la commande (join room)
  async assertCanJoinOrder(orderId: string, user: JwtUser) {
     const cmd = await this.getCommandeOrThrow(orderId);

    // 
    const idLivreur = cmd.livreur?.livreur_id
    const idCommercant = cmd.commerceant.id;

    if (user.role === 'seller' && idCommercant !== user.sub) {
      throw new ForbiddenException('FORBIDDEN_JOIN_NOT_YOUR_ORDER');
    }
    if (user.role === 'courier' && idLivreur !== user.sub) {
      throw new ForbiddenException('FORBIDDEN_JOIN_NOT_ASSIGNED_DRIVER');
    }

    return cmd;
  }

  // WRITE: seul le livreur assigné peut envoyer sa position
  async saveAndBroadcastLocation(payload: DriverLocationDto, user: JwtUser) {
    if (user.role !== 'courier') {
      throw new ForbiddenException('ONLY_DRIVER_CAN_SEND_LOCATION');
    }

    const cmd = await this.getCommandeOrThrow(payload.orderId);
    const idLivreur = cmd.livreur?.livreur_id;

    if (idLivreur !== user.sub) {
      throw new ForbiddenException('FORBIDDEN_NOT_ASSIGNED_DRIVER');
    }

    // Save point in DB
    await this.livreurLocationService.savePoint({
      livreurId: user.sub,
      commandeId: payload.orderId,
      lat: payload.lat,
      lng: payload.lng,
      speed: payload.speed,
      heading: payload.heading,
    });

    return {
      orderId: payload.orderId,
      lat: payload.lat,
      lng: payload.lng,
      speed: payload.speed,
      heading: payload.heading,
      ts: payload.ts ?? Date.now(),
    };
  }
}
