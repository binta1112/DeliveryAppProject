import { User } from "../../users/entity/user.entity";
import { ChildEntity, Column, Entity, JoinColumn, OneToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity('livreurs')
export class Livreur  { 
  @PrimaryGeneratedColumn()
  livreur_id:number
 @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}