import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ProductEngagementService } from './product-engagement.service';
import { UserRequest } from 'src/user/types';
import { ProductEngagementDto } from './product-engagement.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-engagement')
export class ProductEngagementController {
  constructor(private productEngagementService: ProductEngagementService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('cart-points')
  async cartPoints(
    @Req() req: UserRequest,
    @Body() data: ProductEngagementDto,
  ) {
    console.log('Request called');
    const query = this.productEngagementService.createOrUpdateProductEngagement(
      { ...data, score: 3 },
      data.scoreAction,
    );
    return query;
  }
}
