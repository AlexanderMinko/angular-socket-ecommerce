import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItemResponseDto } from 'src/app/model/order-item-response-dto';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderItems: OrderItemResponseDto[];
  orderId: number;
  totalCost: number = 0;
  totalCount: number = 0;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      () => {
        this.orderId = this.activatedRoute.snapshot.params.id;
        this.orderService.getOrderItemByOrderId(this.orderId)
          .subscribe((data: OrderItemResponseDto[]) => {
            this.orderItems = data;
            this.getTotaclCost();
            this.getTotalQuantity();
          });
      });
  }

  getTotaclCost() {
    let totalCost: number = 0;
    this.orderItems.forEach(el => {
      totalCost += el.price * el.count;
    })
    this.totalCost = totalCost;
  }

  getTotalQuantity() {
    let totalCount: number = 0;
    this.orderItems.forEach(el => {
      totalCount += +el.count;
    })
    this.totalCount = totalCount;
  }

}
