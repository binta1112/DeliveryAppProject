import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LivreurService } from './livreur.service';
import { Livreur } from './entity/livreur';
import { LivreurProfileDTO } from './dto/livreurProfile.dto';

@Controller('couriers')
export class CouriersController {
  constructor(
    private readonly livreurService: LivreurService
  ) {}

  @Get('/:id')
  async getCourierProfile( id: string): Promise<LivreurProfileDTO|{}> {
        const livreur = await this.livreurService.findById(id);
    
    if (!livreur) return {};
    
    const profile = new LivreurProfileDTO();
    profile.id = livreur.livreur_id;
    profile.name = livreur.user.nom + ' ' + (livreur.user.prenom || '');
    profile.phone = livreur.user.telephone || '';
    profile.vehicleImages = ["https://res.cloudinary.com/dzjv9f0s9/image/upload/v1700000000/vehicle-placeholder.png"];
    profile.transportType = "Vélo"; // Placeholder, à remplacer par une vraie donnée si disponible
    profile.vehicleRegistration = "AB-123-CD"; // Placeholder, à remplacer par une vraie donnée si disponible

    
    return profile;
  }
}
