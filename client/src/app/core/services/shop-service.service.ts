import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagintaion } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Pagintaion<Product[]>>(this.baseUrl + 'products')
  }
}
