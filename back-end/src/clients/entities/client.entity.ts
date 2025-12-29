import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from '../../commandes/entities/commande.entity';

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

  @OneToMany(() => Commande, (commande) => commande.client)
  commandes: Commande[];
}