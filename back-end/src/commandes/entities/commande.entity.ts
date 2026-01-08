import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Commerceant } from '../../commerceants/entities/commerceant.entity';
import { Client } from '../../clients/entities/client.entity';
import { RappelCommande } from '../../rappel_commandes/entities/rappel-commande.entity';

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

  //"bloc-note" : texte libre avec le détail de la commande, notes, etc.
  @Column({ type: 'text', nullable: true })
  details: string | null;
  

  @ManyToOne(() => Client, (client) => client.commandes, { eager: true })
  client: Client;

  @OneToMany(() => RappelCommande, (reminder) => reminder.commande, {
    cascade: true,
  })
  rappelCommandes: RappelCommande[];
}