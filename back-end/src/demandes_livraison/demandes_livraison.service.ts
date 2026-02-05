import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DemandeLivraison, DemandeLivraisonStatus } from './entities/demande-livraison.entity';
import { Repository } from 'typeorm';
import { CreateDemandeLivraisonDto } from './dto/create-demande-livraison.dto';
import { Commande, CommandeStatus } from 'src/commandes/entities/commande.entity';
import { FilterDemandeLivraisonDto } from './dto/filter-demande-livraison.dto';
import { PropositionPrix, PropositionPrixStatus } from 'src/propositions_prix/entities/proposition-prix.entity';

@Injectable()
export class DemandesLivraisonService {
  constructor(
    @InjectRepository(DemandeLivraison)
    private readonly demandeRepo: Repository<DemandeLivraison>,
    @InjectRepository(Commande)
    private readonly commandeRepo: Repository<Commande>,
    @InjectRepository(PropositionPrix)
    private readonly propositionRepo: Repository<PropositionPrix>,
  ) {}

  async create(dto: CreateDemandeLivraisonDto): Promise<DemandeLivraison> {
    const commande = await this.commandeRepo.findOne({
      where: { id: dto.commandeId },
      relations: ['client', 'commerceant'],
    });
    if (!commande) throw new NotFoundException('Commande not found');

    const existing = await this.demandeRepo.findOne({
      where: { commande: { id: dto.commandeId } },
    });
    if (existing) throw new ConflictException('Demande already exists for this commande');

    const demande = this.demandeRepo.create({
      commande,
      commerceant: commande.commerceant,
      statut: DemandeLivraisonStatus.OPEN,
      details: dto.details || null,
      ville: dto.ville || commande.client?.ville || null,
      adresseLivraison: dto.adresseLivraison || commande.addressLivraison,
      dateLivraison: dto.dateLivraison ? new Date(dto.dateLivraison) : commande.dateLivraison,
    });

    return this.demandeRepo.save(demande);
  }

  async findAllForLivreur(filter: FilterDemandeLivraisonDto): Promise<DemandeLivraison[]> {
    const query = this.demandeRepo
      .createQueryBuilder('demande')
      .leftJoinAndSelect('demande.commande', 'commande')
      .leftJoinAndSelect('commande.client', 'client')
      .leftJoinAndSelect('demande.commerceant', 'commerceant')
      .where('demande.statut = :statut', { statut: filter.statut || DemandeLivraisonStatus.OPEN })
      .orderBy('demande.createdAt', 'DESC');

    if (filter.commerceantId) {
      query.andWhere('commerceant.id = :commerceantId', { commerceantId: filter.commerceantId });
    }

    if (filter.ville) {
      query.andWhere('demande.ville ILIKE :ville', { ville: `%${filter.ville}%` });
    }

    if (filter.dateLivraisonFrom) {
      query.andWhere('demande.dateLivraison >= :from', {
        from: new Date(filter.dateLivraisonFrom),
      });
    }

    if (filter.dateLivraisonTo) {
      query.andWhere('demande.dateLivraison <= :to', {
        to: new Date(filter.dateLivraisonTo),
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<DemandeLivraison> {
  const demande = await this.demandeRepo.findOne({
    where: { id },
    relations: [
      'commande',
      'commande.client',
      'propositions',
      'propositions.livreur',
      'propositions.livreur.user',
      'acceptedProposal',
      'acceptedProposal.livreur',
      'acceptedProposal.livreur.user',
    ],
  });

  if (!demande) throw new NotFoundException('Demande not found');
  return demande;
}

  async close(id: string): Promise<DemandeLivraison> {
    const demande = await this.findOne(id);
    demande.statut = DemandeLivraisonStatus.CLOSED;
    return this.demandeRepo.save(demande);
  }

  async acceptProposal(demandeId: string, proposalId: string): Promise<DemandeLivraison> {
    const demande = await this.findOne(demandeId);

    if (demande.statut !== DemandeLivraisonStatus.OPEN) {
      throw new ConflictException('Demande is not open');
    }

    const proposal = await this.propositionRepo.findOne({
      where: { id: proposalId },
      relations: ['demandeLivraison'],
    });
    if (!proposal || proposal.demandeLivraison.id !== demande.id) {
      throw new NotFoundException('Proposal not found for this demande');
    }

    await this.propositionRepo.update(
      { demandeLivraison: { id: demande.id } },
      { statut: PropositionPrixStatus.REJECTED },
    );

    proposal.statut = PropositionPrixStatus.ACCEPTED;
    await this.propositionRepo.save(proposal);

    demande.acceptedProposal = proposal;
    demande.statut = DemandeLivraisonStatus.ACCEPTED;
    await this.demandeRepo.save(demande);

    demande.commande.statut = CommandeStatus.IN_PROGRESS;
    await this.commandeRepo.save(demande.commande);

    return demande;
  }
}