import { Module } from '@nestjs/common';
import { ProductRecommendationService } from './product-recommendation.service';
import { ProductRecommendationController } from './product-recommendation.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ProductRecommendationService, UserService],
  controllers: [ProductRecommendationController],
})
export class ProductRecommendationModule {}
