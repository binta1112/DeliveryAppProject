import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LivreurLocation } from './livreur-location.entity';

@Injectable()
export class LivreurLocationService {
  constructor(
    @InjectRepository(LivreurLocation)
    private readonly repo: Repository<LivreurLocation>,
  ) {}

  async savePoint(input: {
    livreurId: string;
    commandeId: string;
    lat: number;
    lng: number;
    speed?: number;
    heading?: number;
  }) {
    const loc = this.repo.create(input);
    return this.repo.save(loc);
  }

  async getLastLocation(commandeId: string) {
    return this.repo.findOne({
      where: { commandeId },
      order: { createdAt: 'DESC' },
    });
  }
}
