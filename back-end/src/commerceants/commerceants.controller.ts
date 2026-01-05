import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommerceantsService } from './commerceants.service';
import { CreateCommerceantDto } from './dto/create-commerceant.dto';
import { UpdateCommerceantDto } from './dto/update-commerceant.dto';

@Controller('commerceants')
export class CommerceantsController {
  constructor(private readonly commerceantsService: CommerceantsService) {}

  @Post()
  create(@Body() dto: CreateCommerceantDto) {
    return this.commerceantsService.create(dto);
  }

  @Get()
  findAll() {
    return this.commerceantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commerceantsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommerceantDto) {
    return this.commerceantsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commerceantsService.remove(id);
  }

  // Optionnel : commandes du commerçant
  @Get(':id/commandes')
  listCommandes(@Param('id') id: string) {
    return this.commerceantsService.listCommandes(id);
  }
}