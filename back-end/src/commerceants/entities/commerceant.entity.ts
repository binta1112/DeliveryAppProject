import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from '../../commandes/entities/commande.entity';

@Entity('commerceants')
export class Commerceant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  nom: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  telephone?: string;

  @Column({ nullable: true })
  adresse?: string;

  @OneToMany(() => Commande, (commande) => commande.commerceant)
  commandes: Commande[];
}