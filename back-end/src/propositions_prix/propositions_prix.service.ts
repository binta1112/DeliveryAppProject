import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropositionPrix, PropositionPrixStatus } from './entities/proposition-prix.entity';
import { Repository } from 'typeorm';
import { CreatePropositionPrixDto } from './dto/create-proposition-prix.dto';
import { DemandeLivraison, DemandeLivraisonStatus } from 'src/demandes_livraison/entities/demande-livraison.entity';
import { Livreur } from 'src/livreur/entity/livreur';

@Injectable()
export class PropositionsPrixService {
  constructor(
    @InjectRepository(PropositionPrix)
    private readonly propositionRepo: Repository<PropositionPrix>,
    @InjectRepository(DemandeLivraison)
    private readonly demandeRepo: Repository<DemandeLivraison>,
    @InjectRepository(Livreur)
    private readonly livreurRepo: Repository<Livreur>,
  ) {}

  async create(dto: CreatePropositionPrixDto): Promise<PropositionPrix> {
    const demande = await this.demandeRepo.findOne({ where: { id: dto.demandeLivraisonId } });
    if (!demande) throw new NotFoundException('Demande not found');
    if (demande.statut !== DemandeLivraisonStatus.OPEN) {
      throw new ConflictException('Demande is not open');
    }

    const livreur = await this.livreurRepo.findOne({ where: { livreur_id: dto.livreurId } });
    if (!livreur) throw new NotFoundException('Livreur not found');

    const exists = await this.propositionRepo.findOne({
      where: { demandeLivraison: { id: demande.id }, livreur: { livreur_id: livreur.livreur_id } },
    });
    if (exists) throw new ConflictException('Livreur already proposed a price');

    const proposition = this.propositionRepo.create({
      demandeLivraison: demande,
      livreur,
      prix: dto.prix,
      statut: PropositionPrixStatus.PENDING,
    });

    return this.propositionRepo.save(proposition);
  }

  async findByDemande(demandeId: string): Promise<PropositionPrix[]> {
    return this.propositionRepo.find({
      where: { demandeLivraison: { id: demandeId } },
      order: { createdAt: 'DESC' },
    });
  }
}