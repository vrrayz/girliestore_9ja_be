import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserService } from 'src/user/user.service';
import { ShopService } from 'src/shop/shop.service';
import { JwtService } from '@nestjs/jwt';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    CloudinaryService,
    UserService,
    ShopService,
    JwtService,
    CategoryService,
  ],
})
export class ProductModule {}
