import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { DbService } from 'src/db/db.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: DbService) {}
  async register(req: AuthDto) {
    const password = await argon.hash(req.password);
    try {
      const user = await this.prismaService.user.create({
        data: { ...req, password },
      });
      return { msg: 'User created', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }
}
