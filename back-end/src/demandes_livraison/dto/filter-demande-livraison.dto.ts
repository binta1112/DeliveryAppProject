import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { DemandeLivraisonStatus } from '../entities/demande-livraison.entity';

export class FilterDemandeLivraisonDto {
  @IsOptional()
  @IsUUID()
  commerceantId?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsDateString()
  dateLivraisonFrom?: string;

  @IsOptional()
  @IsDateString()
  dateLivraisonTo?: string;

  @IsOptional()
  @IsEnum(DemandeLivraisonStatus)
  statut?: DemandeLivraisonStatus;
}