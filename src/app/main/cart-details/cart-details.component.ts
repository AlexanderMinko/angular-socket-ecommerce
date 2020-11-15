import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/entity/cart-item';
import { OrderItem } from '../../model/entity/order-item';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderRequestDto } from '../../model/order-request-dto';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  isLoggined: boolean = false;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.authService.getAccount()) {
      this.isLoggined = true;
    }
    this.cartItems = this.cartService.cartItems;
    this.totalPrice = this.cartService.totalPrice;
    this.totalQuantity = this.cartService.totalQuantity;
    this.updateCartStatus();
  }

  onMakeOrder() {
    const orderRequestDto: OrderRequestDto = new OrderRequestDto();
    orderRequestDto.email = this.authService.getAccount().email;
    let cartItems = this.cartItems.map( el => new OrderItem(el));
    orderRequestDto.orderItems = cartItems;
    this.orderService.makeOrder(orderRequestDto)
    .subscribe( (data: number) => {
      this.cartService.clearStorage('cartItems')
      this.router.navigate(['/order-details', data]);
    });
  }

  onIncrease(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  onDecrease(cartItem: CartItem) {
    cartItem.quantity--;
    if( cartItem.quantity === 0) {
      this.cartService.removeFromCart(cartItem);
    } else {
      this.cartService.calculateCartTotals();
    }
  }

  onRemove(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }

  updateCartStatus() {
    this.cartService.totalPriceChange.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantityChange.subscribe(
      data => this.totalQuantity = data
    )
  }
}
