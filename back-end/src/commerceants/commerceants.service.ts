import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commerceant } from './entities/commerceant.entity';
import { CreateCommerceantDto } from './dto/create-commerceant.dto';
import { UpdateCommerceantDto } from './dto/update-commerceant.dto';
import { Commande } from '../commandes/entities/commande.entity';

@Injectable()
export class CommerceantsService {
  constructor(
    @InjectRepository(Commerceant)
    private readonly commerceantRepo: Repository<Commerceant>,
    @InjectRepository(Commande)
    private readonly commandeRepo: Repository<Commande>,
  ) {}

  async create(dto: CreateCommerceantDto): Promise<Commerceant> {
    const entity = this.commerceantRepo.create(dto);
    return this.commerceantRepo.save(entity);
  }

  async findAll(): Promise<Commerceant[]> {
    return this.commerceantRepo.find();
  }

  async findOne(id: string): Promise<Commerceant> {
    const found = await this.commerceantRepo.findOne({
      where: { id },
      relations: ['commandes'],
    });
    if (!found) throw new NotFoundException('Commerceant not found');
    return found;
  }

  async update(id: string, dto: UpdateCommerceantDto): Promise<Commerceant> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.commerceantRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.commerceantRepo.remove(entity);
  }

  // Optionnel : lister les commandes d’un commerçant
  async listCommandes(id: string): Promise<Commande[]> {
    await this.findOne(id); // vérifie l’existence
    return this.commandeRepo.find({
      where: { commerceant: { id } },
      relations: ['client', 'rappelCommandes'],
      order: { createdAt: 'DESC' },
    });
  }
}