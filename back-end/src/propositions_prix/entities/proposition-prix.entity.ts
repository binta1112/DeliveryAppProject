import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DemandeLivraison } from 'src/demandes_livraison/entities/demande-livraison.entity';
import { Livreur } from 'src/livreur/entity/livreur';

export enum PropositionPrixStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity('propositions_prix')
@Unique(['demandeLivraison', 'livreur'])
export class PropositionPrix {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number;

  @Column({
    type: 'enum',
    enum: PropositionPrixStatus,
    default: PropositionPrixStatus.PENDING,
  })
  statut: PropositionPrixStatus;

  @ManyToOne(() => DemandeLivraison, (demande) => demande.propositions, { eager: true })
  demandeLivraison: DemandeLivraison;

  @ManyToOne(() => Livreur, (livreur) => livreur.propositions, { eager: true })
  livreur: Livreur;
}