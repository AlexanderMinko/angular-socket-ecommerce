import { OrderItem } from './order-item';

export class OrderRequestDto {
    email: string;
    orderItems: OrderItem[];
}