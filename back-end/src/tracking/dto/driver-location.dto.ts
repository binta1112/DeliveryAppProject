import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DriverLocationDto {
  @IsString()
  orderId: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsOptional()
  @IsNumber()
  speed?: number;

  @IsOptional()
  @IsNumber()
  heading?: number;

  @IsOptional()
  @IsNumber()
  ts?: number;
}
