import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductEngagementDto {
  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @IsNumber()
  score: number;
}
