import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class WishlistDto {
  //   @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @IsNotEmpty()
  @Type(() => Number)
  userId: number;
}
