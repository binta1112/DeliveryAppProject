import { User } from '../../users/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PropositionPrix } from 'src/propositions_prix/entities/proposition-prix.entity';
import { LivreurLocation } from 'src/livreur-location/livreur-location.entity';
import { LivreurVehiculeImage } from '../livreur-vehicule.entity';
export enum VehicleType {
  SCOOTER = 'SCOOTER',
  CAR = 'CAR',
  BIKE = 'BIKE',
  VAN = 'VAN',
}
@Entity('livreurs')
export class Livreur {
  @PrimaryGeneratedColumn("uuid")
  livreur_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PropositionPrix, (proposal) => proposal.livreur)
  propositions: PropositionPrix[];
  @OneToMany(() => LivreurLocation, (loc) => loc.livreur)
locations: LivreurLocation[];
//info sur le vehicule
 @Column({ type: 'enum', enum: VehicleType,default: VehicleType.SCOOTER })
  vehicule_type: VehicleType;
  @Column({ unique: true , nullable: true})
  vehicule_matricule: string;
 
  @OneToMany(() => LivreurVehiculeImage, (img) => img.livreur, {
    cascade: true,
  })
  vehicleImages: LivreurVehiculeImage[];
}