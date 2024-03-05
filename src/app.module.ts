import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AdminMiddleware } from './admin.middleware';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    DbModule,
    ShopModule,
    CloudinaryModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [UserService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        '/category/create',
        '/category/edit/:id',
        '/category/delete/:id',
      );
  }
}
