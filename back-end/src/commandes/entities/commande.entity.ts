import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commerceant } from '../../commerceants/entities/commerceant.entity';
import { Client } from '../../clients/entities/client.entity';
import { RappelCommande } from '../../rappel_commandes/entities/rappel-commande.entity';
import { Livreur } from '../../livreur/entity/livreur';
import { LivreurLocation } from 'src/livreur-location/livreur-location.entity';
export enum CommandeStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Entity('commandes')
export class Commande {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  addressLivraison: string;

  @Column({ type: 'timestamp', nullable: true })
  dateLivraison: Date | null;

  @Column({
    type: 'enum',
    enum: CommandeStatus,
    default: CommandeStatus.PENDING,
  })
  statut: CommandeStatus;

  @Column({ type: 'text', nullable: true })
  details: string | null;

  @ManyToOne(() => Client, (client) => client.commandes, { eager: true })
  client: Client;

  @ManyToOne(() => Commerceant, (commerceant) => commerceant.commandes, { eager: true })
  commerceant: Commerceant;

  @OneToMany(() => RappelCommande, (reminder) => reminder.commande, { cascade: true })
  rappelCommandes: RappelCommande[];

  @ManyToOne(() => Livreur, { nullable: true, eager: true })
  livreur: Livreur | null;
  @OneToMany(() => LivreurLocation, (loc) => loc.commande)
locations: LivreurLocation[];
}