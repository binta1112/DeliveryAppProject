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
        if (livreur && livreur.user) {
            const user = this.userRepository.create(livreur.user);
            livreur.user = await this.userRepository.save(user);
            const livreurEntity = this.livreurRepository.create(livreur);
            return this.livreurRepository.save(livreurEntity);
        }
        return null;
    }
}
