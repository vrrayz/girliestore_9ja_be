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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { UserRequest } from 'src/user/types';
import { ShopDto } from './shop.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileResponse, ImageValidationPipe } from './file-type.validator';

@Controller('shop')
export class ShopController {
  constructor(
    private shopService: ShopService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'image',
    }),
  )
  async create(
    @Req() req: UserRequest,
    @Body() shopDto: ShopDto,
    @UploadedFile(ImageValidationPipe)
    file: FileResponse,
  ) {
    if (file.statusCode !== 200) {
      return file;
    }
    return await this.cloudinaryService
      .uploadImage(file.data)
      .then((data) => {
        return this.shopService.createShop(
          req.user.email,
          shopDto,
          data.secure_url,
        );
      })
      .catch((error) => {
        return {
          statusCode: 400,
          message: error.message,
        };
      });
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
