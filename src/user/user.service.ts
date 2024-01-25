import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  showUser() {
    return { msg: 'User info displays here' };
  }
}
