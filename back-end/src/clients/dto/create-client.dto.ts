import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateClientDto {
  @IsUUID()
  commerceantId: string;

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

  @IsString()
  @IsNotEmpty()
  ville: string;
}