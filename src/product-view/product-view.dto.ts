import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductViewDto {
  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @IsOptional()
  userId: number;

  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
