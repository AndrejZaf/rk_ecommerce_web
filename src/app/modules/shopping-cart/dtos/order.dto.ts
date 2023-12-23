import { DeliveryInfoDTO } from './delivery-data.dto';
import { SneakerOrderDTO } from './sneaker-order.dto';

export interface OrderDTO {
  sneakers: SneakerOrderDTO[];
  deliveryInfo: DeliveryInfoDTO;
}
