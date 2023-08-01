import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

@Controller('latihan')
export class LatihanController {
  @Get()
  findAll(@Query() query: any) {
    return {
      query,
    };
  }

  @Post()
  create2(@Body() payload: any) {
    return {
      payload: payload,
    };
  }

  @Post('create')
  create(@Body('name') name: string, @Body('sekolah') sekolah: string) {
    console.log('name', name);
    console.log('sekolah', sekolah);

    return {
      name: name,
      sekolah: sekolah,
    };
  }

  @Put('update/:id/:nama')
  update(
    @Body() payload: any,
    @Param('id') id: string,
    @Param('nama') nama: string,
  ) {
    return {
      id: id,
      nama: nama,
      payload: payload,
    };
  }

  @Patch()
  patch() {
    return ' latihan menggunakan method PATCH';
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return {
      id,
      method: 'DELETE',
    };
  }
}
