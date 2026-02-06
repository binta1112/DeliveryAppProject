import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreurVehiculeImage } from 'src/livreur/livreur-vehicule.entity';
import { Livreur } from 'src/livreur/entity/livreur';
@Injectable()
export class LivreurVehiculeService {
    constructor(
        @InjectRepository(LivreurVehiculeImage)
        private readonly livreurVehiculeImageRepository: Repository<LivreurVehiculeImage>,
    ) {}

    // Méthode pour ajouter une image de véhicule pour un livreur
    async addVehicleImage(livreur: Livreur, imageUrl: string): Promise<LivreurVehiculeImage> {
        const newImage = this.livreurVehiculeImageRepository.create({
            url: imageUrl,
            livreur: livreur, // Associer l'image au livreur
        });
        return this.livreurVehiculeImageRepository.save(newImage);
    }
}
