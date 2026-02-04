import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from '../../commandes/entities/commande.entity';
import { Commerceant } from '../../commerceants/entities/commerceant.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  address: string;

  @Column()
  tel: string;

  @Column()
  ville: string;

  @ManyToOne(() => Commerceant, (commerceant) => commerceant.clients, { eager: true })
  commerceant: Commerceant;

  @OneToMany(() => Commande, (commande) => commande.client)
  commandes: Commande[];
}