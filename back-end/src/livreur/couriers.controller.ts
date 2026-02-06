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

  @Get(':id')
  async getCourierProfile( @Param('id') id: string): Promise<LivreurProfileDTO|{}> {    
        const livreur = await this.livreurService.findById(id);
    
    if (!livreur) return {};
    
    const profile = new LivreurProfileDTO();
    profile.id = livreur.livreur_id;
    profile.name = livreur.user.nom + ' ' + (livreur.user.prenom || '');
    profile.phone = livreur.user.telephone || '';   
    profile.transportType = livreur.vehicule_type.toString();
    profile.averageRating =  0;   
    profile.vehicleImages = livreur.vehicleImages ? livreur.vehicleImages.map(img => img.url) : [];
    profile.vehicleRegistration = livreur.vehicule_matricule || '';
    return profile;
  }
}
