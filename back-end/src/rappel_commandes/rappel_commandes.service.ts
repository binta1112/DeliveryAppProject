import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { RappelCommande } from './entities/rappel-commande.entity';
import { CreateRappelCommandeDto } from './dto/create-rappel-commande.dto';
import { Commande } from '../commandes/entities/commande.entity';

@Injectable()
export class RappelCommandesService {
  constructor(
    @InjectRepository(RappelCommande)
    private readonly rappelRepository: Repository<RappelCommande>,
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
  ) {}

  async create(dto: CreateRappelCommandeDto): Promise<RappelCommande> {
    const commande = await this.commandeRepository.findOne({
      where: { id: dto.commandeId },
    });
    if (!commande) {
      throw new NotFoundException('Commande not found');
    }

    const rappel = this.rappelRepository.create({
      contenu: dto.contenu,
      scheduledAt: new Date(dto.scheduledAt),
      commande,
    });

    return this.rappelRepository.save(rappel);
  }

  async getPendingReminders(
    now: Date = new Date(),
  ): Promise<RappelCommande[]> {
    //Rappels dont la date est passée et non lus
    return this.rappelRepository.find({
      where: {
        scheduledAt: LessThanOrEqual(now),
        isRead: false,
      },
      relations: ['commande', 'commande.commerceant'],
    });
  }

  async markAsRead(rappelId: string): Promise<RappelCommande> {
    const rappel = await this.rappelRepository.findOne({
      where: { id: rappelId },
    });
    if (!rappel) {
      throw new NotFoundException('RappelCommande not found');
    }
    rappel.isRead = true;
    return this.rappelRepository.save(rappel);
  }

  async getForCommande(commandeId: string): Promise<RappelCommande[]> {
    return this.rappelRepository.find({
      where: { commande: { id: commandeId } },
      order: { scheduledAt: 'ASC' },
    });
  }
}