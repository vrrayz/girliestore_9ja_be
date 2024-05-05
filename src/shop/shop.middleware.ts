import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { ShopService } from './shop.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShopOwnerMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private jwt: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    //Req headers authorization would always come in the form of 'Bearer ...' so i'm cutting it out
    const authorization = await this.jwt.decode(
      req.headers.authorization.replace('Bearer ', ''),
    );

    const shop = await this.shopService.findShop(parseInt(req.params.id));
    const user = await this.userService.findUser(authorization.email);

    if (
      shop.data.ownerId !== user.data.id &&
      user.data.role !== 'super_admin' &&
      user.data.role !== 'admin'
    ) {
      throw new ForbiddenException('User not owner of this shop');
    }
    next();
  }
}
