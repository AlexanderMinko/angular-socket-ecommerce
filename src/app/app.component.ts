import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'socket';

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.checkStorage('cartItems');
  }

}
