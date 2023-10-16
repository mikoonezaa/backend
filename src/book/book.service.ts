import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateBookDto,
  UpdateBookDto,
  createBookArrayDto,
  deleteBookArrayDto,
  findBookDto,
} from './book.dto';
import { ResponsePagination, ResponseSuccess } from 'interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import BaseResponse from 'src/utils/dto/response/base.response';

@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super();
  }

  private books: {
    id?: number;
    title: string;
    author: string;
    year: number;
  }[] = [
    {
      id: 1,
      title: 'HTML CSS',
      author: 'Ihsananbuhanifah',
      year: 2023,
    },
  ];

  async getAllBooks(findBookDto: findBookDto): Promise<ResponsePagination> {
    const { page, pageSize, title, author, from_year, to_year, limit } =
      findBookDto;

    const filter: {
      [key: string]: any;
    } = {};

    if (title) {
      filter.title = Like(`%${title}%`);
    }
    if (author) {
      filter.author = Like(`%${author}%`);
    }

    if (from_year && to_year) {
      filter.year = Between(from_year, to_year);
    }

    if (from_year && !!to_year === false) {
      filter.year = Between(from_year, from_year);
    }
    console.log('filter', filter);
    const total = await this.bookRepository.count({
      where: filter,
    });
    const book = await this.bookRepository.find({
      where: filter,
      skip: limit,
      take: pageSize,
    });
    return this._pagination('ok', book, total, page, pageSize);
    // return {
    //   status: 'ok',
    //   message: ' berhasil',
    //   data: book,
    //   pagination: {
    //     total: total,
    //     page: page,
    //     pageSize: pageSize,
    //     total_page: Math.ceil(total / pageSize),
    //   },
    // };
  }

  async createBook(payload: CreateBookDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', payload);
      const { title, author, year } = payload;

      const bookSave = await this.bookRepository.save({
        title: title,
        author: author,
        year: year,
      });
      return this._success('berhasil y', bookSave);
      // return {
      //   status: 'Success',
      //   message: 'Berhasil menambahkan Buku',
      //   data: bookSave,
      // };
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const book = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });

    console.log('book', book);

    if (book === null) {
      throw new NotFoundException('Buku dengan id $(id) tidak ditemukan');
    }

    return {
      status: 'ok',
      message: 'berhasil',
      data: book,
    };
  }

  async updateBook(
    id: number,
    UpdateBookDto: UpdateBookDto,
  ): Promise<ResponseSuccess> {
    const check = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException('buku dengan id ${id} tidak ditemukan');

    const update = await this.bookRepository.save({ ...UpdateBookDto, id: id });

    return {
      status: 'succes',
      message: 'buku berhasi di update',
      data: update,
    };
  }
  async deleteBook(id: number): Promise<ResponseSuccess> {
    const check = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (!check)
      throw new NotFoundException('Buku dengan id ${id} tidak ditemukan');
    await this.bookRepository.delete(id);
    return {
      status: 'ok',
      message: 'Berhasil Mengahapus Buku',
    };
  }
  findBookByid(id: number) {
    const bookIndex = this.books.findIndex((books) => books.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Buku Dengan ${id} Tidak Ditemukan`);
    }

    return bookIndex;
  }

  async bulkCreate(payload: createBookArrayDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', payload);
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (item) => {
          try {
            await this.bookRepository.save(item);
            berhasil = berhasil + 1;
          } catch {
            gagal = gagal + 1;
          }
        }),
      );

      return {
        status: 'ok',
        message: `berhasil menambahkan buku sebanyak ${berhasil} dan gagal sebanyak ${gagal}`,
      };
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async bulkDelete(payload: deleteBookArrayDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', payload);
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.delete.map(async (data) => {
          try {
            const result = await this.bookRepository.delete(data);
            if (result.affected === 1) {
              berhasil = berhasil + 1;
            } else {
              gagal = gagal + 1;
            }
          } catch {}
        }),
      );

      return {
        status: 'ok',
        message: `berhasil menghapus buku sebanyak ${berhasil} dan gagal sebanyak ${gagal}`,
      };
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
