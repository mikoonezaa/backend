import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async register(@Body() payload: RegisterDto) {
    return this.authService.login(payload);
  }
}
