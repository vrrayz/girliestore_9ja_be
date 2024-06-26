import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;

  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  price: number;
}
