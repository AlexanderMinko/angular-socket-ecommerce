import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/entity/product';
import { Category } from '../model/entity/category';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProductBySearch(name: string, page: number, size: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/search?name=${name}&page=${page}&size=${size}`);
  }

  getProducts(page: number, size: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(id: number, page: number, size: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/by-category?id=${id}&page=${page}&size=${size}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  getProductsSorterByPriceAsc(page: number, size: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/by-price-asc?page=${page}&size=${size}`)
  }

  getProductsSorterByPriceDesc(page: number, size: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/by-price-desc?page=${page}&size=${size}`)
  }

  getProductsSorterByName(page: number, size: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/by-name?page=${page}&size=${size}`)
  }
}

interface ProductResponse {
  content: Product[];
  totalElements: number;
}

