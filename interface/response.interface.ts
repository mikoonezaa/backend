export interface ResponseSuccess {
  status: string;
  message: string;
  data?: any;
}

export interface ResponsePagination extends ResponseSuccess {
  pagination: {
    total: number;
    total_page?: number;
    page: number;
    pageSize: number;
  };
}
export interface ResponseProdukPagination extends ResponseSuccess {
  paginationProduk: {
    nama_produk: string;
    kategori_produk: string;
    harga_produk: number;
    jumlah_produk: number;
    deskripsi_produk: string;
  };
}
