import { OrderItem } from './entity/order-item';

export class OrderRequestDto {
    email: string;
    orderItems: OrderItem[];
}