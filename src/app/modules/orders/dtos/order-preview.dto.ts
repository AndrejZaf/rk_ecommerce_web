import { OrderStatus } from '../../shopping-cart/enums/order-status.enum';
import { OrderInventoryDTO } from './order-inventory.dto';

export interface OrderPreviewDTO {
  orderStatus: OrderStatus;
  uuid: string;
  orderPrice: number;
  orderInventory: OrderInventoryDTO[];
}
