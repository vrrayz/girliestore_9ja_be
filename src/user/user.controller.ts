import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { DbService } from 'src/db/db.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private dbService: DbService,
  ) {}

  @Get('user')
  user() {
    return this.userService.showUser();
  }

  @Get('db')
  dbRoute() {
    return { msg: 'Nothing to see here' };
  }
}
