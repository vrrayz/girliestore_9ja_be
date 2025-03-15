import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { WishlistDto } from './wishlist.dto';
import { ProductEngagementService } from 'src/product-engagement/product-engagement.service';

@Injectable()
export class WishlistService {
  constructor(
    private prismaService: DbService,
    private engagementService: ProductEngagementService,
  ) {}

  async createWishlist(data: WishlistDto) {
    try {
      const wishlist = await this.prismaService.wishlist.findFirst({
        where: {
          ...data,
        },
      });

      if (wishlist) {
        throw new BadRequestException('Wishlist Item Already Exist');
      }
      const createdWishlist = await this.prismaService.wishlist.create({
        data: {
          userId: data.userId,
          productId: data.productId,
        },
      });
      await this.engagementService.createOrUpdateProductEngagement(
        {
          productId: data.productId,
          score: 2,
        },
        'increment',
      );
      return { statusCode: 200, data: createdWishlist };
    } catch (error) {
      throw error;
    }
  }

  async deleteWishlist(id: string) {
    try {
      const wishlist = await this.prismaService.wishlist.delete({
        where: {
          id,
        },
      });
      await this.engagementService.createOrUpdateProductEngagement(
        {
          productId: wishlist.productId,
          score: 2,
        },
        'decrement',
      );
      return { statusCode: 200, data: wishlist };
    } catch (error) {
      throw error;
    }
  }
}
