/* eslint-disable prettier/prettier */
import {
  ResponseProdukPagination,
  ResponseSuccess,
} from 'interface/response.interface';
import { createTracing } from 'trace_events';

class ProdukResponse {
  _successss(message: string, data?: any): ResponseSuccess {
    return {
      status: 'success',
      message: message,
      data: data || {},
    };
  }
  _paginationProduk (
    message: string,
    data: any,
    nama_produk: string,
    kategori_produk: string,
    harga_produk: number,
    jumlah_produk: number,
    deskripsi_produk: string,
  ): ResponseProdukPagination {
    return {
      status: 'succes',
      message: message,
      data: data,
      paginationProduk: {
        nama_produk: nama_produk,
        kategori_produk: kategori_produk,
        harga_produk: harga_produk,
        jumlah_produk: jumlah_produk,
        deskripsi_produk: deskripsi_produk,
      },
    };
  }
}

export default ProdukResponse;
