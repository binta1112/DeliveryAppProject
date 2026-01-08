import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from '../../commandes/entities/commande.entity';
import { OneToOne } from 'typeorm/browser';
import { Commerceant } from '../../commerceants/entities/commerceant.entity';
import { join } from 'path';

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
 /* @OneToOne(() => Commerceant,(Commerceant)=>Commerceant.clients)
  @JoinColumn({ name: 'seller_id' })
  seller: Commerceant;*/
  @OneToMany(() => Commande, (commande) => commande.client)
  commandes: Commande[];
}