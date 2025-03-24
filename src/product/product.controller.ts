import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  FilesResponse,
  ImageLabelsValidationPipe,
  ImagesValidationPipe,
} from 'src/file-type.validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ShopService } from 'src/shop/shop.service';
import { CategoryService } from 'src/category/category.service';
import { SortOrder } from 'src/db/types';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
    private shopService: ShopService,
    private categoryService: CategoryService,
  ) {}

  @Get('')
  findProducts(@Query('orderBy') orderBy: SortOrder) {
    return this.productService.findProducts(orderBy);
  }

  @Get('trending')
  findTrendingProducts() {
    return this.productService.findTrendingProducts();
  }

  @Get('random-subcategory/:subCategoryId')
  findRandomProductBySubCategory(
    @Query('limit') limit: number,
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number,
  ) {
    return this.productService.findRandomProductsBySubCategory(
      subCategoryId,
      limit,
    );
  }

  @Get('find-label')
  findProductsByLabel(
    @Query('label') label: string,
    @Query('orderBy') orderBy: SortOrder,
  ) {
    return this.productService.findProductsByLabel(label, orderBy);
  }

  @Get(':id')
  findProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProduct(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('file', 4, { dest: 'image' }))
  @Post('create')
  async createProduct(
    @Req() req,
    @Body() productDto: ProductDto,
    @Body('imageLabels', ImageLabelsValidationPipe)
    imageLabels: { className: string },
    @UploadedFiles(ImagesValidationPipe)
    files: FilesResponse,
  ) {
    await this.categoryService.findCategory(productDto.categoryId);
    await this.shopService.shopAuthorization(productDto.shopId, req.user.email);
    // console.log('The files here === ', files);
    if (!files || files.statusCode !== 200 || files.data.length == 0) {
      // console.log('Nothing was passed here');
      return files;
    }

    try {
      const uploads = await Promise.all(
        files.data.map((file) => this.cloudinaryService.uploadImage(file)),
      );
      const imageUrls = uploads.map((upload) => upload.secure_url);
      const newProductDto = { ...productDto, imageLabels };
      // console.log('PRoduct DTO === ', productDto);
      // console.log('image labels === ', imageLabels);
      return this.productService.createProduct(newProductDto, imageUrls);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(
    @Req() req,
    @Body('shopId', ParseIntPipe) shopId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.shopService.shopAuthorization(shopId, req.user.email);
    return this.productService.deleteProduct(id);
  }
}
