import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commerceants')
export class Commerceant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany( () => Client ,(client) => client)
  clients: Client[];

  
}