import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Livreur } from './entity/livreur';
@Entity('livreur-vehicule-images')
export class LivreurVehiculeImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    url: string;
    @ManyToOne(() => Livreur, (livreur) => livreur.vehicleImages, {
    onDelete: 'CASCADE',
  })
  livreur: Livreur;
}