import { DeliveryInfoDTO } from '../dtos/delivery-data.dto';
import { SneakerDTO } from '../dtos/sneaker.dto';

export interface CartViewModel {
  cartSneakers: SneakerDTO[];
  cartDeliveryData?: DeliveryInfoDTO;
}
