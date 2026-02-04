import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Commande } from 'src/commandes/entities/commande.entity';

@Entity('commerceants')
export class Commerceant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Client, (client) => client.commerceant)
  clients: Client[];

  @OneToMany(() => Commande, (commande) => commande.commerceant)
  commandes: Commande[];
}