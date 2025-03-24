import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { UserRequest } from 'src/user/types';
import { AuthGuard } from '@nestjs/passport';
import { WishlistDto } from './wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findWishlist(@Req() req: UserRequest) {
    const query = await this.wishlistService.findWishlist(req.user.id);
    return query;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createWishlist(
    @Body() wishlistDto: WishlistDto,
    @Req() req: UserRequest,
  ) {
    const query = await this.wishlistService.createWishlist({
      productId: wishlistDto.productId,
      userId: req.user.id,
    });
    return query;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(@Req() req, @Param('id') id: string) {
    const query = await this.wishlistService.deleteWishlist(id);
    return query;
  }
}
