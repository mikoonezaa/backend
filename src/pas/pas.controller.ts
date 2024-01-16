/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PasService } from './pas.service';
import {
  CreateProdukDto,
  UpdateProdukDto,
  createProdukBulkDto,
  deleteProdukBulkDto,
} from './pas.dto';

@Controller('pas')
export class PasController {
  constructor(private passervice: PasService) {}
  @Post('create')
  createPas(@Body() payload: CreateProdukDto) {
    return this.passervice.createPas(payload);
  }

  @Put('update/:id')
  updatePas(@Param('id') id: string, @Body() updateProdukDto: UpdateProdukDto) {
    return this.passervice.updatePas(Number(id), updateProdukDto);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.passervice.getDetail(id);
  }

  @Delete('delete/:id')
  deletePas(@Param('id') id: string) {
    return this.passervice.deletePas(+id);
  }

  @Post('create/bulk')
  produkBulk(@Body() payload: createProdukBulkDto) {
    return this.passervice.produkBulk(payload);
  }

  @Post('delete/bulk')
  deleteProduk(@Body() payload: deleteProdukBulkDto) {
    return this.passervice.deleteProdukBulk(payload)
  }
}

const array = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  }
]
