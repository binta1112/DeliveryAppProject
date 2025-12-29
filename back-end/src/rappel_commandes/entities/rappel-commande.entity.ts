import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from '../../commandes/entities/commande.entity';

@Entity('rappel_commandes')
export class RappelCommande {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  contenu: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @ManyToOne(() => Commande, (commande) => commande.rappelCommandes, {
    onDelete: 'CASCADE',
  })
  commande: Commande;
}