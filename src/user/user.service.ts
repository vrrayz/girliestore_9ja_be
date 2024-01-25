import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private prismaService: DbService) {}
  async showUsers() {
    const users = await this.prismaService.user.findMany({
      select: { name: true, email: true, createdAt: true },
    });
    return { msg: 'User info displays here', data: users };
  }
}
