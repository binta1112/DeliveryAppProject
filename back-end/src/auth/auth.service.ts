import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/userCreate.dto';
import { User } from 'src/users/entity/user.entity';
import { Commerceant } from 'src/commerceants/entities/commerceant.entity';
import { CommerceantsService } from 'src/commerceants/commerceants.service';
import { Livreur, VehicleType } from 'src/livreur/entity/livreur';
import { LivreurService } from 'src/livreur/livreur.service';
import { AuthResponseDTO } from './dto/authResponseDTO';
import * as bcrypt from 'bcrypt';
import { LivreurVehiculeService } from 'src/livreur-vehicule/livreur-vehicule.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject('JWT_ACCESS_SERVICE') private readonly jwtAccessService: JwtService,
    @Inject('JWT_REFRESH_SERVICE') private readonly jwtRefreshService: JwtService,
    private readonly sellersService: CommerceantsService,
    private readonly couriersService: LivreurService,
    private readonly usersService: UsersService,
    private readonly livreurVehicleService: LivreurVehiculeService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) return null;

    const payload = { email: user.email, sub: user.id, role: user.role };
    const acces_token = this.jwtAccessService.sign(payload);
    const refresh_token = this.jwtRefreshService.sign(payload);

    const response = new AuthResponseDTO();
    response.accessToken = acces_token;
    response.refreshToken = refresh_token;
    response.userId = user.id;
    response.userEmail = user.email;
    response.userRole = user.role;
    response.userFirstName = user.prenom;
    response.userLastName = user.nom;
    response.userProfileImage = user.profileImage || null;

    if (user.role === 'seller') {
      const seller = await this.sellersService.findByUserId(user.id);
      response.commerceantId = seller?.id || null;
    }
    if (user.role === 'courier') {
      const courier = await this.couriersService.findByUserId(user.id);
      response.livreurId = courier?.livreur_id || null;
    }

    return response;
  }

  async signup(user: CreateUserDto) {
    let newUser = new User();
    if (!user) return null;

    newUser.email = user.email;
    newUser.password = await this.hashPassword(user.password);
    newUser.nom = user.nom;
    newUser.prenom = user.prenom;
    newUser.adresse = user.adresse;
    newUser.telephone = user.telephone;

    if (user.role == 'seller') {
      newUser.role = 'seller';
      const newSeller = new Commerceant();
      newSeller.user = newUser;
      return await this.sellersService.create(newSeller);
    }
    if (user.role == 'courier') {
      newUser.role = 'courier';
      const newCourier = new Livreur();
      newCourier.user = newUser;
      newCourier.vehicule_type = user.vehicule_type as VehicleType;
      newCourier.vehicule_matricule = user.vehicule_matricule;
      // Pass only the URLs, let LivreurService handle entity creation
      newCourier.vehicleImages = (user.vehicule_images || []).map(url => ({ imageUrl: url } as any));
      console.log('Creating courier with data:', newCourier);
      return await this.couriersService.create(newCourier);
    }
    return null;
  }
  async  hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
} 
async  comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
}