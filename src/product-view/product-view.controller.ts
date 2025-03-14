import { Body, Controller, Post, Req } from '@nestjs/common';
import { ProductViewService } from './product-view.service';
// import { AuthGuard } from '@nestjs/passport';
import { ProductViewDto } from './product-view.dto';
import { UserRequest } from 'src/user/types';

@Controller('product-view')
export class ProductViewController {
  constructor(private productViewService: ProductViewService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createProduct(
    @Body() productViewDto: ProductViewDto,
    @Req() req: UserRequest,
  ) {
    const query = await this.productViewService.createProductView({
      ...productViewDto,
      userId: req.user?.id,
    });
    return { statusCode: 200, data: query.data };
  }
}
