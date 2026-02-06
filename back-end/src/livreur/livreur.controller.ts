
import { Controller, Post, Body } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { Livreur } from './entity/livreur';

@Controller('livreur')
export class LivreurController {
	constructor(private readonly livreurService: LivreurService) {}

	@Post()
	async createLivreur(@Body() livreurData: Partial<Livreur>) {
		return this.livreurService.create(livreurData);
	}
}
