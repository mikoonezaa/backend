/* eslint-disable @typescript-eslint/no-unused-vars */
enum KategoriProduk {
  Meja = 'meja',
  Kursi = 'kursi',
  Televisi = 'televisi',
  PapanTulis = 'papanTulis',
  Jam = 'jam',
}

interface Produk {
  id?: number;
  nama_produk: string;
  kategori_produk: KategoriProduk;
  harga_produk: number;
  jumlah_produk: number;
  deskripsi_produk: string;
  tahun_pembuatan: number;
  created_date: Date;
  updated_date: Date;
}
