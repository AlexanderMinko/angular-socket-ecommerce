import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../model/entity/cart-item';
import { Product } from '../model/entity/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = 'http://localhost:8080/api/shopping-cart';

  cartItems: CartItem[] = [];
  totalPriceChange: Subject<number> = new Subject<number>();
  totalQuantityChange: Subject<number> = new Subject<number>();
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private http: HttpClient
    ) { }

  getDeserializedShoppingCart(serializedShoppingCart: string) {
    return this.http.get<CartItem[]>(`${this.baseUrl}/${serializedShoppingCart}`);
  }

  addToCart(cartItem: CartItem) {
    this.checkExistingItemAndPush(cartItem);
    this.setStorage('cartItems');
    this.calculateCartTotals();
  }

  decreaseQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if( cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.setStorage('cartItems')
      this.calculateCartTotals();
    }
  }

  removeFromCart(cartItem: CartItem) {
    const index = this.cartItems.findIndex(el => el.id === cartItem.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartItems.length > 0 ? this.setStorage('cartItems') : this.clearStorage('cartItems');
    this.calculateCartTotals();
  }

  setStorage(key: string) {
    sessionStorage.setItem(key, JSON.stringify(this.cartItems));
    this.setCookie(key, this.cartItems, 1);
  }

  clearStorage(key: string) {
    sessionStorage.removeItem(key);
    const allCookies: string[] = document.cookie.split(';');
    const myCookie: string[] = allCookies.filter(el => el.trim().startsWith(key));
    const cookies: string[] = myCookie[0].trim().split('=');
    if (cookies[0] === key) {
      this.setCookie(key, [], -1)
    }
    this.cartItems = [];
    this.calculateCartTotals();
  }

  checkExistingItemAndPush(cartItem: CartItem) {
    let existCartItem: CartItem;
    if (this.cartItems.length > 0) {
      existCartItem = this.cartItems.find(item => item.id === cartItem.id);
    }
    if (existCartItem) {
      existCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
  }

  checkStorage(key: string) {
    let sessionCartItems: CartItem[] = JSON.parse(sessionStorage.getItem(key));
    if (sessionCartItems) {
      this.cartItems = sessionCartItems;
      this.calculateCartTotals();
    } else if (document.cookie.length > 0) {
      this.getCookie(key);
    }
  }

  getCookie(key: string) {
    const allCookies: string[] = document.cookie.split(';');
    const myCookie: string[] = allCookies.filter(el => el.trim().startsWith(key));
    const cookies: string[] = myCookie[0]?.trim().split('=');
    if(cookies) {
      console.log(cookies);
      console.log("lol");
      const serializedShoppingCart = cookies[1];
      this.getDeserializedShoppingCart(serializedShoppingCart)
      .subscribe( (data: CartItem[]) => {
        this.cartItems = data;
        this.setStorage('cartItems');
        this.calculateCartTotals();
      });
    }
  }

  setCookie(key: string, value: CartItem[], year: number) {
    let cookieValue: string = '';
      for (let cartItem of value) {
        cookieValue += `${cartItem.id}-${cartItem.quantity}|`;
      }
      cookieValue = cookieValue.substring(0, cookieValue.length - 1);
    const date: Date = new Date();
    date.setFullYear(date.getFullYear() + year);
    document.cookie = `${key}=${cookieValue};path=/;expires=${date};`;

  }

  calculateCartTotals() {
    let totalQuantity: number = 0;
    let totalPrice: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPrice += currentCartItem.quantity * currentCartItem.price;
      totalQuantity += currentCartItem.quantity;
    }
    this.totalPrice = +totalPrice.toFixed(2);
    this.totalPriceChange.next(+totalPrice.toFixed(2));
    this.totalQuantity = totalQuantity;
    this.totalQuantityChange.next(totalQuantity);
  }

  logCartData(totalPrice: number, totalQuantity: number) {
    for (let cartItem of this.cartItems) {
      const subTotalPrice = cartItem.quantity * cartItem.price;
      console.log(`name=${cartItem.name}, quantity=${cartItem.quantity},`
        + `unitPrice=${cartItem.price}, subTotalPrice=${subTotalPrice.toFixed(2)}`);

    }
    console.log(`totalPrice=${totalPrice.toFixed(2)}, totalQuantity=${totalQuantity}`);
    console.log('---');
  }
}
