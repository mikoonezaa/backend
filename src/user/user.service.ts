import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseSuccess } from 'interface';

@Injectable()
export class UserService {
  private user: {
    id: number;
    nama: string;
    email: string;
    umur: number;
    tanggal_lahir: number;
    status: string;
  }[] = [
    {
      id: 2,
      nama: 'Miko Ahmadineza',
      email: 'mikoo120422@gmail.com',
      umur: 16,
      tanggal_lahir: 29,
      status: 'pelajar',
    },
  ];

  getAllUser(): {
    id: number;
    nama: string;
    email: string;
    umur: number;
    tanggal_lahir: number;
    status: string;
  }[] {
    return this.user;
  }

  createUser(payload: any): ResponseSuccess {
    console.log('pay', payload);
    const { nama, email, umur, tanggal_lahir, status } = payload;

    {
      this.user.push({
        id: new Date().getTime(),
        nama: nama,
        email: email,
        umur: umur,
        tanggal_lahir: tanggal_lahir,
        status: status,
      });

      return {
        status: 'berhasil nambah',
        message: 'Berhasil nambah user',
      };
    }
  }

  updateUser(id: number, payload: any): ResponseSuccess {
    const { nama, email, umur, tanggal_lahir, status } = payload;
    const userIndex = this.findUserByid(id);
    this.user[userIndex].id = id;
    this.user[userIndex].nama = nama;
    this.user[userIndex].email = email;
    this.user[userIndex].umur = umur;
    this.user[userIndex].tanggal_lahir = tanggal_lahir;
    this.user[userIndex].status = status;

    return {
      status: 'Update',
      message: 'berhasil',
    };
  }

  deleteUser(id: number): ResponseSuccess {
    const userIndex = this.findUserByid(id);
    this.user.splice(userIndex, 2);
    return {
      status: 'delete',
      message: 'Berhasil dihapus',
    };
  }

  findUserByid(id: number) {
    const userIndex = this.user.findIndex(
      (user: { id: number }) => user.id === id,
    );
    if (userIndex === -1) {
      throw new NotFoundException(`GAGAL`);
    }

    return userIndex;
  }

  getDetail(id: number): {
    id: number;
    nama: string;
    email: string;
    umur: number;
    tanggal_lahir: number;
    status: string;
  } {
    const userIndex = this.findUserByid(id);
    const user = this.user[userIndex];
    return user;
  }
}
