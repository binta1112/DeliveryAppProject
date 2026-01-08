import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {CreateUserDto} from '../users/dto/userCreate.dto'

import { User } from 'src/users/entity/user.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';
import { CommerceantsService } from 'src/commerceants/commerceants.service';
import { Livreur } from 'src/livreur/entity/livreur';
import { LivreurService } from 'src/livreur/livreur.service';


@Injectable()
export class AuthService {
    constructor( @Inject('JWT_ACCESS_SERVICE') private readonly jwtAccessService: JwtService,
                @Inject('JWT_REFRESH_SERVICE') private readonly jwtRefreshService: JwtService,
                
                private readonly sellersService: CommerceantsService,
                private readonly couriersService: LivreurService,
                 ) {};
    login(email: string,password: string) {
     
        if(email !== 'login@gmail.com' || password !== 'Password123@') {
            
            console.log('User authenticated');
            return null;
        }
       
        const payload = { 
            email: email, 
            sub: '123456' 
        };    
        const acces_token = this.jwtAccessService.sign(payload);
        const refresh_token = this.jwtRefreshService.sign(payload);
        const reponse = {
            message : 'success',
            access_token: acces_token,
            refresh_token: refresh_token,
        }
        console.log(acces_token)
        console.log(refresh_token)
        return reponse;
    }
signup(user:CreateUserDto) {
    let newUser = new User();
    
    if(!user) return null;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.nom = user.nom;
    newUser.prenom = user.prenom;
    newUser.adresse = user.adresse;
    newUser.telephone = user.telephone;
    if(user.role == 'seller') {
       const newSeller = new Commerceant();
       newSeller.user = newUser;     
       return this.sellersService.create(newSeller);
    }
    if(user.role == 'courier') {
        const newCourier = new Livreur();
        newCourier.user = newUser;
        return this.couriersService.create(newCourier);
    }
    

    return null;
}
}
