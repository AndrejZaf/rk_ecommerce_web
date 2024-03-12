import { OrderStatus } from '../enums/order-status.enum';

export interface OrderVerificationDTO {
  orderStatus: OrderStatus;
  uuid: string;
  orderPrice: number;
}
