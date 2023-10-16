/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UtsService } from './uts.service';
import {
  CreateUtsDto,
  UpdateUtsDto,
  createUtsArrayDto,
  deleteUtsArrayDto,
  findUtsDto,
} from './uts.dto';

@Controller('uts')
export class UtsController {
  constructor(private utsservice: UtsService) {}

  @Get('list')
  getAllUts(@Query() findUtsDto: findUtsDto) {
    console.log('query', findUtsDto);
    return this.utsservice.getAllUts(findUtsDto);
  }

  @Post('create')
  createUts(@Body() payload: CreateUtsDto) {
    return this.utsservice.createUts(payload);
  }

  @Put('update/:id')
  findOneUts1(@Param('id') id: string, @Body() payload: UpdateUtsDto) {
    return this.utsservice.updateUts(Number(id), payload);
  }

  @Delete('delete/:id')
  deleteUts(@Param('id') id: string) {
    return this.utsservice.deleteUts(+id);
  }

  @Get('detail/:id')
  findOneUts(@Param('id') id: string) {
    return this.utsservice.getDetail(Number(id));
  }

  @Post('create/bulk')
  createBulk(@Body() paylaod: createUtsArrayDto) {
    return this.utsservice.bulkCreate(paylaod);
  }

  @Post('delete/bulk')
  deleteBulk(@Body() payload: deleteUtsArrayDto) {
    return this.utsservice.deleteBulk(payload);
  }
}
