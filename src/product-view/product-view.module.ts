import { Module } from '@nestjs/common';
import { ProductViewService } from './product-view.service';
import { ProductViewController } from './product-view.controller';
import { ProductEngagementService } from 'src/product-engagement/product-engagement.service';

@Module({
  providers: [ProductViewService, ProductEngagementService],
  controllers: [ProductViewController],
})
export class ProductViewModule {}
