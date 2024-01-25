import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { DbService } from 'src/db/db.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: DbService) {}
  async register(req: RegisterDto) {
    const password = await argon.hash(req.password);
    try {
      const user = await this.prismaService.user.create({
        data: { ...req, password },
      });
      delete user.password;
      return { msg: 'User created', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }
  async login(req: LoginDto) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email: req.email },
      });
      const isCorrectPassword = await argon.verify(user.password, req.password);

      if (!isCorrectPassword)
        throw new ForbiddenException('Incorrect Credentials');

      delete user.password;
      return { msg: 'Logged in success', user: user };
    } catch (error) {
      if (error.code == 'P2025')
        //error code sent from findUniqueOrThrow
        throw new ForbiddenException('Incorrect Credentials');
      throw error;
    }
  }
}
