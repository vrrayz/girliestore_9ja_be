import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { ProductEngagementService } from 'src/product-engagement/product-engagement.service';

@Module({
  providers: [WishlistService, ProductEngagementService],
  controllers: [WishlistController],
})
export class WishlistModule {}
