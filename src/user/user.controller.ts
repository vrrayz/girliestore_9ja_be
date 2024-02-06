import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DbService } from 'src/db/db.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from './types';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private dbService: DbService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  showProfile(@Req() req: UserRequest) {
    return this.userService.findUser(req.user.email);
  }

  @Get('users')
  user() {
    return this.userService.showUsers();
  }

  @Get('db')
  dbRoute() {
    return { msg: 'Nothing to see here' };
  }
}
