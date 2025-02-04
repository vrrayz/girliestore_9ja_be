import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;

  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  categoryId: number;

  @IsNotEmpty()
  @Type(() => Number)
  subCategoryId: number;

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

  @IsOptional()
  imageLabels: any;

  @IsNotEmpty()
  @Type(() => Number)
  size: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
