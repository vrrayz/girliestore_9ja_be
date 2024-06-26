import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private prismaService: DbService) {}
  async showUsers() {
    const users = await this.prismaService.user.findMany({
      select: { name: true, email: true, createdAt: true },
    });
    return { statusCode: 200, data: users };
  }
  async findUser(email: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email },
        select: {
          id: true,
          name: true,
          bio: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          role: true,
        },
      });

      return { statusCode: 200, data: user };
    } catch (error) {
      if (error.code == 'P2025')
        throw new ForbiddenException('Incorrect Credentials');
      throw error;
    }
  }
}
