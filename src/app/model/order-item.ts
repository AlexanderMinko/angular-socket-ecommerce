import { CartItem } from "./cart-item";

export class OrderItem {
    count: number;
    productId: number;

    constructor(cartItem: CartItem) {
        this.count = cartItem.quantity;
        this.productId = cartItem.id;
    }
}