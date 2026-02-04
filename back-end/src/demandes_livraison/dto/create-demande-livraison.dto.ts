import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDemandeLivraisonDto {
  @IsUUID()
  commandeId: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  adresseLivraison?: string;

  @IsOptional()
  @IsDateString()
  dateLivraison?: string;
}