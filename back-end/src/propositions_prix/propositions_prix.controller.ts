import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PropositionsPrixService } from './propositions_prix.service';
import { CreatePropositionPrixDto } from './dto/create-proposition-prix.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('price-proposals')
export class PropositionsPrixController {
  constructor(private readonly service: PropositionsPrixService) {}

  @Post()
  create(@Body() dto: CreatePropositionPrixDto) {
    return this.service.create(dto);
  }

  @Get()
  findByDemande(@Query('demandeId') demandeId: string) {
    return this.service.findByDemande(demandeId);
  }

  // ✅ nouveau endpoint
  @Get('by-livreur')
  findByLivreur(@Query('livreurId') livreurId: string) {
    return this.service.findByLivreur(livreurId);
  }
}