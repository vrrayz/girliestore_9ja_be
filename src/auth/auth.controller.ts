import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() req: RegisterDto) {
    return this.authService.register(req);
  }

  @Post('login')
  login(@Body() req: LoginDto) {
    console.log('Request coming in == ', req.email);
    return this.authService.login(req);
  }
}
