import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { RappelCommandesService } from './rappel_commandes.service';
//import { CreateRappelCommandeDto } from './dto/create-rappel-commande.dto';
import { MarkRappelReadDto } from './dto/mark-rappel-read.dto';

@Controller('rappel-commandes')
export class RappelCommandesController {
  constructor(
    private readonly rappelCommandesService: RappelCommandesService,
  ) {}

  //Optionnel (admin/test) : création manuelle
  /*@Post()
  create(@Body() dto: CreateRappelCommandeDto) {
    return this.rappelCommandesService.create(dto);
  }*/

  // Récupération des rappels à envoyer maintenant
  @Get('pending')
  getPending() {
    return this.rappelCommandesService.getPendingReminders();
  }

  @Patch('mark-read')
  markRead(@Body() dto: MarkRappelReadDto) {
    return this.rappelCommandesService.markAsRead(dto.rappelId);
  }

  @Get('commande/:commandeId')
  getForCommande(@Param('commandeId') commandeId: string) {
    return this.rappelCommandesService.getForCommande(commandeId);
  }
}