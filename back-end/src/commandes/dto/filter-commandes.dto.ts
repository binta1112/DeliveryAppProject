import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { CommandeStatus } from '../entities/commande.entity';

export class FilterCommandesDto {
  @IsUUID()
  commerceantId: string; //on filtre toujours par commerçant connecté

  @IsOptional()
  @IsEnum(CommandeStatus)
  statut?: CommandeStatus;
}