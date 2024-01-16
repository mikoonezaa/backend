import { Max, Min } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_produk: string;

  @Column()
  kategori_produk: string;

  @Column()
  harga_produk: number;

  @Column()
  jumlah_produk: number;

  @Column()
  deskripsi_produk: string;

  @Column()
  @Min(2010)
  @Max(2023)
  tahun_pembuatan: number;
}
