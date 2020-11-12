import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderRequestDto } from '../model/order-request-dto';
import { OrderResponseDto } from '../model/order-response-dto';
import { OrderItemResponseDto } from '../model/order-item-response-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = 'http://localhost:8080/api/order'

  constructor(
    private http: HttpClient
  ) { }

  makeOrder(orderRequestDto: OrderRequestDto) {
    return this.http.post<number>(`${this.baseUrl}/make`, orderRequestDto);
  }

  getOrdersByEmail(email: string) {
    return this.http.get<OrderResponseDto[]>(`${this.baseUrl}?email=${email}`);
  }

  getOrderItemByOrderId(id: number) {
    return this.http.get<OrderItemResponseDto[]>(`${this.baseUrl}/${id}`);
  }
}
