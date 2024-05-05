import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    //Req headers authorization would always come in the form of 'Bearer ...' so i'm cutting it out
    const authorization = await this.jwt.decode(
      req.headers.authorization.replace('Bearer ', ''),
    );

    const user = await this.userService.findUser(authorization.email);

    if (user.data.role !== 'admin' && user.data.role !== 'super_admin') {
      throw new ForbiddenException('User not allowed to perform this action');
    }
    next();
  }
}
