import { Module } from '@nestjs/common';
import { ProductEngagementService } from './product-engagement.service';
import { ProductEngagementController } from './product-engagement.controller';

@Module({
  providers: [ProductEngagementService],
  controllers: [ProductEngagementController]
})
export class ProductEngagementModule {}
