/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  CreateBookDto,
  UpdateBookDto,
  createBookArrayDto,
  deleteBookArrayDto,
  findBookDto,
} from './book.dto';
import { Pagination } from 'src/utils/dto/decorator/pagination.decoration';

@Controller('book')
export class BookController {
  constructor(private bookservice: BookService) {}
  @Get('list')
  getAllBook(@Pagination() findBookDto: findBookDto) {
    console.log('query', findBookDto);
    return this.bookservice.getAllBooks(findBookDto);
  }
  @Post('create')
  createBook(@Body() payload: CreateBookDto) {
    return this.bookservice.createBook(payload);
  }

  @Get('detail/:id')
  findOneBook(@Param('id') id: string) {
    return this.bookservice.getDetail(Number(id));
  }

  @Put('update/:id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookservice.updateBook(Number(id), updateBookDto);
  }

  @Delete('delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookservice.deleteBook(+id);
  }

  @Post('create/bulk')
  createBulk(@Body() payload: createBookArrayDto) {
    return this.bookservice.bulkCreate(payload);
  }

  @Post('delete/bulk')
  deleteBulk(@Body() payload: deleteBookArrayDto) {
    return this.bookservice.bulkDelete(payload);
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
  },
];
