import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { UserRequest } from 'src/user/types';
import { ShopDto } from './shop.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Req() req: UserRequest, @Body() data: ShopDto) {
    console.log(req.user);
    return this.shopService.createShop(req.user.email, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('edit/:id')
  edit(@Body() data: ShopDto, @Param('id', ParseIntPipe) id: number) {
    return this.shopService.updateShop(data, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.deleteShop(id);
  }

  @Get(':id')
  showShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findShop(id);
  }
}
