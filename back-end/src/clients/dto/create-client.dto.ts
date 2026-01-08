import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  sellerId: number;
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  tel: string;
}