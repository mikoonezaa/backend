/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uts } from './uts.entity';
import {
  CreateUtsDto,
  UpdateUtsDto,
  createUtsArrayDto,
  deleteUtsArrayDto,
  findUtsDto,
} from './uts.dto';
import { ResponseSuccess } from 'interface';
import { async } from 'rxjs';

@Injectable()
export class UtsService {
  constructor(
    @InjectRepository(Uts) private readonly utsRepository: Repository<Uts>,
  ) {}

  private uts: {
    id?: number;
    nama: string;
    merekMobil: string;
    tipeMobil: string;
    harga: number;
    tahun: number;
  }[] = [
    {
      id: 1,
      nama: 'miko',
      merekMobil: 'honda',
      tipeMobil: 'CRV', // Tipe mobil untuk merek 'honda' dengan 'CRV'
      harga: 150000000,
      tahun: 2017,
    },
  ];

  async getAllUts(findUtsDto: findUtsDto): Promise<ResponseSuccess> {
    const result = await this.utsRepository.find();
    return {
      status: 'succes',
      message: 'List berhasil',
      data: result,
    };
  }

  async createUts(payload: CreateUtsDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', payload);
      const { nama, merekMobil, tipeMobil, harga, tahun } = payload;

      const UtsSave = await this.utsRepository.save({
        nama: nama,
        merekMobil: merekMobil,
        tipeMobil: tipeMobil,
        harga: harga,
        tahun: tahun,
      });

      return {
        status: 'Success',
        message: 'Berhasil menambahkan Buku',
        data: UtsSave,
      };
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUts(id: number): Promise<ResponseSuccess> {
    const check = await this.utsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (check === null) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }
    const hapus = await this.utsRepository.delete(id);
    return {
      status: 'berhasil',
      message: 'berhasil hapus',
      data: hapus,
    };
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const uts = await this.utsRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log('uts', uts);

    if (uts === null) {
      throw new NotFoundException('Buku dengan id ${id} tidak ditemukan');
    }

    return {
      status: 'berhasil',
      message: 'berhasil',
      data: uts,
    };
  }

  async bulkCreate(payload: createUtsArrayDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', payload);
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (item) => {
          try {
            await this.utsRepository.save(item);
            berhasil = berhasil + 1;
          } catch {
            gagal = gagal + 1;
          }
        }),
      );
      return {
        status: 'ok',
        message: `berhasil menambahkan buku sebanyak ${berhasil} dan gagal ${gagal}`,
      };
    } catch {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUts(id: number, paylaod: UpdateUtsDto): Promise<ResponseSuccess> {
    const uts = await this.utsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (uts === null) {
      throw new NotFoundException(`pembelian dengan id ${id} tidak ditemukan`);
    }
    const update = await this.utsRepository.save({ ...paylaod, id: id });
    return {
      status: 'ok',
      message: 'Berhasil memperbaharui pembelian',
      data: update,
    };
  }

  async deleteBulk(paylaod: deleteUtsArrayDto): Promise<ResponseSuccess> {
    try {
      console.log('pay', paylaod);
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        paylaod.delete.map(async (data) => {
          try {
            const result = await this.utsRepository.delete(data);
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

  private findUtsById(id: number) {
    const utsIndex = this.uts.findIndex((uts) => uts.id === id);

    if (utsIndex === -1) {
      throw new NotFoundException(`pembelian dengan ${id} tidak ditemukan`);
    }

    return utsIndex;
  }
}
