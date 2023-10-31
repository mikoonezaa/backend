/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAccessTokenStrategy } from './jwtAccessToken.strategy';
import { JwtGuard, JwtGuardRefreshToken } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }
  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Req() req) {
    console.log('informasi user login', req.user);
    const { id } = req.user;
    return this.authService.myProfile(id);
  }

  @UseGuards(JwtGuardRefreshToken)
  @Get('refesh-token')
  async refeshToken(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const id = req.headers.id;
    return this.authService.refreshToken(+id, token);
  }
}
