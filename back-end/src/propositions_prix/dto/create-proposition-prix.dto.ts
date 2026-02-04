import { IsNumber, IsUUID } from 'class-validator';

export class CreatePropositionPrixDto {
  @IsUUID()
  demandeLivraisonId: string;

  @IsNumber()
  prix: number;

  @IsNumber()
  livreurId: number;
}