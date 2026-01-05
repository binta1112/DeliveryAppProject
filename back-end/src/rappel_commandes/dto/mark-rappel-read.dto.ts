import { IsUUID } from 'class-validator';

export class MarkRappelReadDto {
  @IsUUID()
  rappelId: string;
}