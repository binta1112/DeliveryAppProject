import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Livreur } from '../livreur/entity/livreur';
import { Commande } from '../commandes/entities/commande.entity';

@Entity()
@Index(['commandeId', 'createdAt'])
@Index(['livreurId', 'createdAt'])
export class LivreurLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  lat: number;

  @Column('double precision')
  lng: number;

  @Column({ type: 'double precision', nullable: true })
  speed?: number;

  @Column({ type: 'double precision', nullable: true })
  heading?: number;

  @Column()
  livreurId: string;

  @ManyToOne(() => Livreur, { onDelete: 'CASCADE' })
  livreur: Livreur;

  @Column()
  commandeId: string;

  @ManyToOne(() => Commande, { onDelete: 'CASCADE' })
  commande: Commande;

  @CreateDateColumn()
  createdAt: Date;
}
