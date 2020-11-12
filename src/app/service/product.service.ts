import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Category } from '../model/category';
import { ReviewRequestDto } from '../model/review-request-dto';
import { Review } from '../model/review';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
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

  postReview(reviewRequestDto: ReviewRequestDto) {
    return this.http.post(`${this.baseUrl}/reviews`, reviewRequestDto, {responseType: 'text'});
  }

  getReviewsByProductId(id: number) {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews/${id}`);
  }

  getReviewsByEmail(email: string) {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews?email=${email}`);
  }

}

interface ProductResponse {
  content: Product[];
  totalElements: number;
}

