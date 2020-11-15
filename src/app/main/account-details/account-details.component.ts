import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/model/login-response';
import { OrderResponseDto } from 'src/app/model/order-response-dto';
import { Review } from 'src/app/model/entity/review';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: LoginResponse;
  orders: OrderResponseDto[];
  reviews: Review[];
  size: number = 4;
  totalElements = 0;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.account = this.authService.getAccount();
    this.orderService.getOrdersByEmail(this.account.email)
    .subscribe((data: OrderResponseDto[]) => this.orders = data);
    this.getReviews()
  }

  getReviews() {
    this.reviewService.getReviewsByEmail(this.account.email, this.size)
    .subscribe( data => {
      this.reviews = data.content;
      this.totalElements = data.totalElements;
    } );
  }

  loadMore() {
      this.size += 4;
      this.getReviews();
  }

}
