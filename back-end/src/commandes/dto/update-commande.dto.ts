import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandeDto } from './create-commande.dto';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { CommandeStatus } from '../entities/commande.entity';

export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {
  @IsOptional()
  @IsEnum(CommandeStatus)
  statut?: CommandeStatus;

  @IsOptional()
  @IsDateString()
  dateLivraison?: string;
}