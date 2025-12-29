import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRappelCommandeDto {
  @IsUUID()
  commandeId: string;

  @IsString()
  @IsNotEmpty()
  contenu: string;

  @IsDateString()
  scheduledAt: string;
}