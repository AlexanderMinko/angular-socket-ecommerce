import { Category } from './category'
import { Producer } from './producer'

export class Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: Category;
    producer: Producer;
}