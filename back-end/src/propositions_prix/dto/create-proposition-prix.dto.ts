import { IsNumber, IsUUID } from 'class-validator';

export class CreatePropositionPrixDto {
  @IsUUID()
  demandeLivraisonId: string;

  @IsNumber()
  prix: number;

  @IsUUID()
  livreurId: string;
}