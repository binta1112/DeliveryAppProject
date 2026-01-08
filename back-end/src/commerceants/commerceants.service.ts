import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Commerceant } from './entities/commerceant.entity';
import { CreateCommerceantDto } from './dto/create-commerceant.dto';
import { UpdateCommerceantDto } from './dto/update-commerceant.dto';
import { Commande } from '../commandes/entities/commande.entity';
import { User } from 'src/users/entity/user.entity';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class CommerceantsService {
  constructor(
    @InjectRepository(Commerceant)
    private readonly commerceantRepo: Repository<Commerceant>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(seller: Commerceant): Promise<Commerceant|null> {
    if(seller&& seller.user){
      const user = this.userRepo.create(seller.user);
      seller.user = await this.userRepo.save(user);
      const sellerEntity = this.commerceantRepo.create(seller);
      return this.commerceantRepo.save(sellerEntity);      
    }
    return null;
  }

  

}