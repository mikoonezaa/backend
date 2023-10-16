/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { UtsService } from './uts.service';
import { UtsController } from './uts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uts } from './uts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Uts])],
  providers: [UtsService],
  controllers: [UtsController],
})
export class UtsModule {}
