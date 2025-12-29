import { Body,Controller,Delete,Get,Param,Patch,Post,Query} from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { FilterCommandesDto } from './dto/filter-commandes.dto';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  create(@Body() dto: CreateCommandeDto) {
    return this.commandesService.create(dto);
  }

  @Get()
  findAll(@Query() filter: FilterCommandesDto) {
    return this.commandesService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommandeDto) {
    return this.commandesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandesService.remove(id);
  }
}