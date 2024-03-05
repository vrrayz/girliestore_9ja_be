import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { UserService } from 'src/user/user.service';
import { ShopOwnerMiddleware } from './shop.middleware';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, UserService, JwtService, CloudinaryService],
})
export class ShopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopOwnerMiddleware)
      .forRoutes('/shop/edit/:id', '/shop/delete/:id');
  }
}
