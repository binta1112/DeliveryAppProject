import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';
import { Commande } from 'src/commandes/entities/commande.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,    
    @InjectRepository(Commande)
    private readonly commandeRepo: Repository<Commande>,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const entity = this.clientRepo.create(dto);
    return this.clientRepo.save(entity);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  async findOne(id: string): Promise<Client> {
    const found = await this.clientRepo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Client not found');
    return found;
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.clientRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.clientRepo.remove(entity);
  }
}