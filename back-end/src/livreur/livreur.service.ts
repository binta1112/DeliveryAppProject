import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Livreur } from './entity/livreur';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class LivreurService {
  constructor(
    @InjectRepository(Livreur)
    private readonly livreurRepository: Repository<Livreur>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(livreur: Partial<Livreur>): Promise<Livreur | null> {
      if (livreur && livreur.user ) {
        const user = this.userRepository.create(livreur.user);
        livreur.user = await this.userRepository.save(user);
        // Transform vehicleImages from array of URLs to array of objects { url }
        let vehicleImages 
        if (livreur.vehicleImages && Array.isArray(livreur.vehicleImages)) {
          vehicleImages = (livreur.vehicleImages as unknown as string[]).map((url: string) => ({ url }));
        }
        const livreurEntity = this.livreurRepository.create({
          ...livreur,
          ...(vehicleImages ? { vehicleImages } : {}),
        });
        return this.livreurRepository.save(livreurEntity);
      }
      return null;
  }

  async findByUserId(userId: number): Promise<Livreur | null> {
    return this.livreurRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
  async findById(id: string): Promise<Livreur | null> { 
    return this.livreurRepository.findOne({
      where: { livreur_id: id },
      relations: ['user', 'vehicleImages'],
    });
  }
}