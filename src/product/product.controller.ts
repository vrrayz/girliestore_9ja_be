import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesResponse, ImagesValidationPipe } from 'src/file-type.validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ShopService } from 'src/shop/shop.service';
import { CategoryService } from 'src/category/category.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
    private shopService: ShopService,
    private categoryService: CategoryService,
  ) {}

  @Get(':id')
  findProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProduct(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('file', 2, { dest: 'image' }))
  @Post('create')
  async createProduct(
    @Req() req,
    @Body() productDto: ProductDto,
    @UploadedFiles(ImagesValidationPipe)
    files: FilesResponse,
  ) {
    await this.categoryService.findCategory(productDto.categoryId);
    await this.shopService.shopAuthorization(productDto.shopId, req.user.email);
    if (files.statusCode !== 200) {
      return files;
    }
    const uploads = [];
    try {
      for (let index = 0; index < files.data.length; index++) {
        const upload = await this.cloudinaryService.uploadImage(
          files.data[index],
        );
        uploads.push(upload.secure_url);
      }
      return this.productService.createProduct(productDto, uploads);
    } catch (error) {
      throw error;
    }
  }
}
