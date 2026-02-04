import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { DemandesLivraisonService } from './demandes_livraison.service';
import { CreateDemandeLivraisonDto } from './dto/create-demande-livraison.dto';
import { FilterDemandeLivraisonDto } from './dto/filter-demande-livraison.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('delivery-requests')
export class DemandesLivraisonController {
  constructor(private readonly service: DemandesLivraisonService) {}

  @Post()
  create(@Body() dto: CreateDemandeLivraisonDto) {
    return this.service.create(dto);
  }

  @Get()
  findAllForLivreur(@Query() filter: FilterDemandeLivraisonDto) {
    return this.service.findAllForLivreur(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/close')
  close(@Param('id') id: string) {
    return this.service.close(id);
  }

  @Patch(':id/accept-proposal/:proposalId')
  acceptProposal(@Param('id') id: string, @Param('proposalId') proposalId: string) {
    return this.service.acceptProposal(id, proposalId);
  }
}