import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductEngagementDto {
  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  @Type(() => Number)
  score: number;

  @IsOptional()
  scoreAction?: 'increment' | 'decrement';
}
