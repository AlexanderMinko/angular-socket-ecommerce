import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/model/login-response';
import { OrderResponseDto } from 'src/app/model/order-response-dto';
import { Review } from 'src/app/model/review';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: LoginResponse;
  orders: OrderResponseDto[];
  reviews: Review[];
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.account = this.authService.getAccount();
    this.orderService.getOrdersByEmail(this.account.email)
    .subscribe((data: OrderResponseDto[]) => this.orders = data);
    
    this.productService.getReviewsByEmail(this.account.email)
    .subscribe((data: Review[]) => this.reviews = data);
  }

}
