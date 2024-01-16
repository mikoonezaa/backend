/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProdukResponse from 'src/utils/dto/response/produk.response';
import { Pas } from './pas.entity';
import { Between, Like, Repository } from 'typeorm';
import {
  CreateProdukDto,
  UpdateProdukDto,
  createProdukBulkDto,
  deleteProdukBulkDto,
  findPasDto,
} from './pas.dto';
import {
  ResponsePagination,
  ResponseProdukPagination,
  ResponseSuccess,
} from 'interface';
import { UpdateBookDto } from 'src/book/book.dto';
import { filter, from } from 'rxjs';

@Injectable()
export class PasService extends ProdukResponse {
  constructor(
    @InjectRepository(Pas) private readonly pasRepository: Repository<Pas>,
  ) {
    super();
  }

  private produks: {
    id: number;
    nama_produk: string;
    kategori_produk: string;
    harga_produk: number;
    jumlah_produk: number;
    deskripsi_produk: string;
  }[] = [
    {
      id: 1,
      nama_produk: 'Motor',
      kategori_produk: 'motor',
      harga_produk: 10000000,
      jumlah_produk: 1,
      deskripsi_produk: 'masih bagus',
    },
  ];

  async createPas(payload: CreateProdukDto): Promise<ResponseSuccess> {
    try {
      const {
        nama_produk,
        kategori_produk,
        harga_produk,
        jumlah_produk,
        deskripsi_produk,
      } = payload;

      const produkSave = await this.pasRepository.save({
        nama_produk: nama_produk,
        kategori_produk: kategori_produk,
        harga_produk: harga_produk,
        jumlah_produk: jumlah_produk,
        deskripsi_produk: deskripsi_produk,
      });
      return this._successss('Berhasil Membuat', produkSave);
    } catch {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePas(
    id: number,
    UpdateProdukDto: UpdateProdukDto,
  ): Promise<ResponseSuccess> {
    const check = await this.pasRepository.findOne({
      where: {
        id,
      },
    });
    if (!check)
      throw new NotFoundException('produk dengan id ${id} tidak ditemukan');

    const update = await this.pasRepository.save({
      ...UpdateProdukDto,
      id: id,
    });

    return {
      status: 'Succes',
      message: 'Berhasil MengUpdate Produk',
      data: update,
    };
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const data = await this.pasRepository.findOne({
      where: { id: id },
    });

    if (data === null) {
      throw new NotFoundException('Produk Dengan id ${id} tidak ditemukan');
    }

    return {
      status: 'ok',
      message: 'berhasil',
      data: data,
    };
  }

  async deletePas(id: number): Promise<ResponseSuccess> {
    const check = await this.pasRepository.findOne({
      where: {
        id,
      },
    });
    if (!check)
      throw new NotFoundException('Buku dengan id ${id} tidak ditemukan');
    await this.pasRepository.delete(id);
    return this._successss('Berhasil Menghapus Produk');
  }

  // async getAllPas(findPasDto: findPasDto): Promise<ResponseProdukPagination> {
  //   const {
  //     nama_produk,
  //     kategori_produk,
  //     harga_produk,
  //     jumlah_produk,
  //     deskripsi_produk,
  //     tahun_pembuatan,
  //     created_date,
  //   } = findPasDto;

  //   const filters: {
  //     [key: string]: any;
  //   } = {};

  //   if (nama_produk) {
  //     filters.name = Like(`%${nama_produk}%`);
  //   }
  //   if (kategori_produk) {
  //     filters.category = Like(`%${kategori_produk}%`);
  //   }
  //   if (harga_produk && harga_produk) {
  //     filters.harga_produk = Between(harga_produk, harga_produk);
  //   }

  //   if (jumlah_produk && jumlah_produk) {
  //     filters.jumlah_produk = Between(jumlah_produk, jumlah_produk);
  //   }
  //   if (deskripsi_produk && deskripsi_produk) {
  //     filters.deskripsi_produk = Between(deskripsi_produk, deskripsi_produk);
  //   }
  //   if (tahun_pembuatan && tahun_pembuatan) {
  //     filters.tahun_pembuatan = Between(tahun_pembuatan, tahun_pembuatan);
  //   }
  //   if (created_date) {
  //     filters.created_date = Between (created_date,created_date)
  //   }

  //   const total = await this.pasRepository.count({
  //     where: filters,
  //   });
  //   const pas = await this.pasRepository.find({
  //     where: filters,
  //   });
  // //  return this._paginationProduk(
  // //   'ok'
  // //   harga_produk,
  // //   nama_produk,
  // //   kategori_produk,
  // //   jumlah_produk,
  // //   created_date,
  // //  )
  // }

  async produkBulk(payload: createProdukBulkDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (produk) => {
          try {
            await this.pasRepository.save(produk);
            berhasil = berhasil + 1;
          } catch {
            gagal = gagal + 1;
          }
        }),
      );
      return {
        status: 'ok',
        message: `berhasil menambahkan produk sebanyak ${berhasil} dan gagal sebanyak ${gagal}`,
      };
    } catch {
      throw new HttpException('ada keslahan', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProdukBulk(
    paylaod: deleteProdukBulkDto,
  ): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        paylaod.data.map(async (data) => {
          try {
            const result = await this.pasRepository.delete(data);
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
        message: `berhasil menghapus produk sebanyak ${berhasil} dan gagal sebanyak ${gagal}`,
      };
    } catch {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
