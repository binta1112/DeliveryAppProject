import { PartialType } from '@nestjs/mapped-types';
import { CreateCommerceantDto } from './create-commerceant.dto';

export class UpdateCommerceantDto extends PartialType(CreateCommerceantDto) {}