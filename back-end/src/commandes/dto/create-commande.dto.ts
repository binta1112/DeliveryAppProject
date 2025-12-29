import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { CommandeStatus } from '../entities/commande.entity';

export class CreateCommandeDto {
  @IsUUID()
  commerçantId: string;

  @IsUUID()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  addressLivraison: string;

  @IsOptional()
  @IsDateString()
  dateLivraison?: string;

  @IsOptional()
  @IsEnum(CommandeStatus)
  statut?: CommandeStatus;

  @IsOptional()
  @IsString()
  details?: string;
}