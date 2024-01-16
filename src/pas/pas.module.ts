import { Module } from '@nestjs/common';
import { PasController } from './pas.controller';
import { PasService } from './pas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pas } from './pas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pas])],
  providers: [PasService],
  controllers: [PasController],
})
export class PasModule {}
