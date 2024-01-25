import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { DbService } from 'src/db/db.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private dbService: DbService,
  ) {}

  @Get('users')
  user() {
    return this.userService.showUsers();
  }

  @Get('db')
  dbRoute() {
    return { msg: 'Nothing to see here' };
  }
}
