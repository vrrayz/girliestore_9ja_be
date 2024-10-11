import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductRecommendationService } from './product-recommendation.service';
import { UserRequest } from 'src/user/types';
import { AuthGuard } from '@nestjs/passport';
import { ProductRecommendationDto } from './product-recommendation.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('product-recommendation')
export class ProductRecommendationController {
  constructor(private recommendationService: ProductRecommendationService) {}

  @Post('')
  addProductToRecommendation(
    @Req() req: UserRequest,
    @Body() recommendationDto: ProductRecommendationDto,
  ) {
    return this.recommendationService.createRecommendation(
      req.user.email,
      recommendationDto,
    );
  }

  @Get('')
  getProductRecommendation(
    @Req() req: UserRequest,
    @Query('limit') limit: number,
  ) {
    return this.recommendationService.findRecommendations(
      req.user.email,
      limit,
    );
  }
}
