import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Category } from '../model/category';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(id: number, page: number, size: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/by-category?id=${id}&page=${page}&size=${size}`);
  }

}

interface ProductResponse {
  content: Product[];
  totalElements: number;
}

