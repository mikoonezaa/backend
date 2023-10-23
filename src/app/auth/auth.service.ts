import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import BaseResponse from 'src/utils/dto/response/base.response';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService, //panggil kelas jwt service
  ) {
    super();
  }
}
