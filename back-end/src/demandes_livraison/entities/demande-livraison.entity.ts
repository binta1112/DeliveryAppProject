import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from 'src/commandes/entities/commande.entity';
import { PropositionPrix } from 'src/propositions_prix/entities/proposition-prix.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';

export enum DemandeLivraisonStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ACCEPTED = 'ACCEPTED',
}

@Entity('demandes_livraison')
export class DemandeLivraison {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: DemandeLivraisonStatus,
    default: DemandeLivraisonStatus.OPEN,
  })
  statut: DemandeLivraisonStatus;

  @Column({ type: 'text', nullable: true })
  details: string | null;

  @Column({ type: 'varchar', nullable: true })
  ville: string | null;

  @Column({ type: 'varchar', nullable: true })
  adresseLivraison: string | null;

  @Column({ type: 'timestamp', nullable: true })
  dateLivraison: Date | null;

  @OneToOne(() => Commande, { eager: true })
  @JoinColumn({ name: 'commande_id' })
  commande: Commande;

  @ManyToOne(() => Commerceant, { eager: true })
  commerceant: Commerceant;

  @OneToMany(() => PropositionPrix, (proposal) => proposal.demandeLivraison)
  propositions: PropositionPrix[];

  @ManyToOne(() => PropositionPrix, { nullable: true })
  @JoinColumn({ name: 'accepted_proposal_id' })
  acceptedProposal: PropositionPrix | null;
}