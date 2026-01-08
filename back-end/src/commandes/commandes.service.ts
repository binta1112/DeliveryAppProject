import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande, CommandeStatus } from './entities/commande.entity';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { FilterCommandesDto } from './dto/filter-commandes.dto';
import { Client } from '../clients/entities/client.entity';
import { RappelCommande } from 'src/rappel_commandes/entities/rappel-commande.entity';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
   @InjectRepository(RappelCommande)
    private readonly rappelCommandeRepository: Repository<RappelCommande>,
   /* @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,*/
  ) {}

  async create(dto: CreateCommandeDto): Promise<Commande> {

    /*const client = await this.clientRepository.findOne({
      where: { id: dto.clientId  },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }*/
   
    const commande = this.commandeRepository.create({
      addressLivraison: dto.addressLivraison,
      dateLivraison: dto.dateLivraison ? new Date(dto.dateLivraison) : null,
      statut: dto.statut || CommandeStatus.PENDING,
      details: dto.details || null,      
      //client,
    });

    return this.commandeRepository.save(commande);
  }

  async findAll(filter: FilterCommandesDto): Promise<Commande[]> {
    const query = this.commandeRepository
      .createQueryBuilder('commande')
      .leftJoinAndSelect('commande.client', 'client')
      .leftJoinAndSelect('commande.commerceant', 'commerceant')
      .leftJoinAndSelect('commande.rappelCommandes', 'rappelCommandes')
      .where('commerceant.id = :commerceantId', {
        commerceantId: filter.commerceantId,
      })
      .orderBy('commande.createdAt', 'DESC');

    if (filter.statut) {
      query.andWhere('commande.statut = :statut', { statut: filter.statut });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({
      where: { id },
      relations: ['client', 'commerceant', 'rappelCommandes'],
    });
    if (!commande) {
      throw new NotFoundException('Commande not found');
    }
    return commande;
  }

  async update(id: string, dto: UpdateCommandeDto): Promise<Commande> {
    const commande = await this.findOne(id);

    if (dto.addressLivraison !== undefined) {
      commande.addressLivraison = dto.addressLivraison;
    }
    if (dto.dateLivraison !== undefined) {
      commande.dateLivraison = dto.dateLivraison
        ? new Date(dto.dateLivraison)
        : null;
    }
    if (dto.statut !== undefined) {
      commande.statut = dto.statut;
    }
    if (dto.details !== undefined) {
      commande.details = dto.details;
    }

    return this.commandeRepository.save(commande);
  }

  async remove(id: string): Promise<void> {
    const commande = await this.findOne(id);
    await this.commandeRepository.remove(commande);
  }
}