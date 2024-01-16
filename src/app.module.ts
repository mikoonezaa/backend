import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { BookModule } from './book/book.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UtsModule } from './uts/uts.module';
import { AuthModule } from './app/auth/auth.module';
import { PasModule } from './pas/pas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LatihanModule,
    BookModule,
    UtsModule,
    AuthModule,
    PasModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
