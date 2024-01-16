import { OmitType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PasRequestDto } from 'src/utils/dto/pas.dto';

export class ProdukDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(5, 30)
  nama_produk: string;

  @IsString()
  kategori_produk: string;

  @IsNumber()
  @Min(10)
  @Max(100)
  harga_produk: number;

  @IsNumber()
  @Min(10)
  @Max(15)
  jumlah_produk: number;

  @IsString()
  deskripsi_produk: string;

  @IsInt()
  @Min(2010)
  @Max(2023)
  tahun_pembuatan: number;
}

export class CreateProdukDto extends OmitType(ProdukDto, ['id']) {}
export class UpdateProdukDto extends PickType(ProdukDto, [
  'nama_produk',
  'kategori_produk',
  'harga_produk',
  'jumlah_produk',
  'deskripsi_produk',
  'tahun_pembuatan',
]) {}

export class findPasDto extends PasRequestDto {
  @IsOptional()
  nama_produk: string;

  @IsOptional()
  kategori_produk: string;

  @IsOptional()
  jumlah_produk: number;

  @IsOptional()
  @IsInt()
  harga_produk: number;

  @IsOptional()
  deskripsi_produk: string;

  @IsOptional()
  tahun_pembuatan: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  created_date: Date;
}

export class createProdukBulkDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProdukDto)
  data: CreateProdukDto[];
}

export class deleteProdukBulkDto {
  @IsArray()
  data: number[];
}
