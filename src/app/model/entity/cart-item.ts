import { Product } from './product';

export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    descriprion: string;
    unitPrice: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.descriprion = product.description;
        this.unitPrice = product.price;
        this.quantity = 1;
    }
}