import { IsNumber, IsString } from 'class-validator';

export class PasRequestDto {
  @IsString()
  nama_produk: string;

  @IsString()
  kategori_produk: string;

  @IsNumber()
  jumlah_produk: number;

  @IsNumber()
  harga_produk: number;

  @IsString()
  deskripsi_produk: string;

  @IsNumber()
  tahun_pembuatan: number;

  @IsNumber()
  created_date: Date;
}
