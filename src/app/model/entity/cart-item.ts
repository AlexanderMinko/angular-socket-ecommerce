import { Product } from './product';

export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.description = product.description;
        this.price = product.price;
        this.quantity = 1;
    }
}