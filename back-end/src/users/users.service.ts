import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(          
              
              
              @InjectRepository(User) 
               private readonly userRepository:Repository<User>,
               
            ) {}
    
    //Methode de creation d'un user s
    async create(user:Partial<User>):Promise<User>{
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    
    findByEmail(email:string){
     return this.userRepository.findOne({where:{email}})
    }
    //Methode de recherche de user par mail et password
   async findByEmailAndPassword(email:string,password:string){
        return this.userRepository.findOne({where:{email,password}})
    }

    async findById(id: number) {
        return this.userRepository.findOne({ where: { id } });
}
}
