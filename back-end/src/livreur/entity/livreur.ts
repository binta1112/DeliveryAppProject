import { User } from '../../users/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PropositionPrix } from 'src/propositions_prix/entities/proposition-prix.entity';

@Entity('livreurs')
export class Livreur {
  @PrimaryGeneratedColumn()
  livreur_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PropositionPrix, (proposal) => proposal.livreur)
  propositions: PropositionPrix[];
}