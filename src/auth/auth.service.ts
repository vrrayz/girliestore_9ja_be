import { ForbiddenException, Injectable } from '@nestjs/common';
import { GoogleAuthDto, LoginDto, RegisterDto } from './dto';
import { DbService } from 'src/db/db.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: DbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(req: RegisterDto) {
    const password = await argon.hash(req.password);
    try {
      const user = await this.prismaService.user.create({
        data: { ...req, password },
      });
      return this.signToken(user.id, user.email);
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

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2025')
        //error code sent from findUniqueOrThrow
        throw new ForbiddenException('Incorrect Credentials');
      throw error;
    }
  }
  async googleAuth(req: GoogleAuthDto) {
    try {
      const payload = await this.jwt.decode(req.access_token);
      if (payload && payload.iss === 'https://accounts.google.com') {
        const user = await this.prismaService.user.findUnique({
          where: { email: payload.email },
        });
        if (user) {
          if (user.authProvider !== 'google') {
            throw new ForbiddenException('Incorrect Credentials');
          }
          return this.signToken(user.id, user.email);
        }
        const newUser = await this.prismaService.user.create({
          data: {
            name: payload.name,
            email: payload.email,
            authProvider: 'google',
          },
        });
        return this.signToken(newUser.id, newUser.email);
      }
      throw new ForbiddenException('Incorrect Credentials');
    } catch (error) {
      throw error;
    }
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string; statusCode: number }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '120m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      statusCode: 200,
      access_token: token,
    };
  }
}
