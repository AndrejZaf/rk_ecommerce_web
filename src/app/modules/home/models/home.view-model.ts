import { PremiumSneakerDTO } from '../dtos/premium-sneaker.dto';
import { SneakerDTO } from '../dtos/sneaker.dto';

export interface HomeViewModel {
  premiumSneaker: PremiumSneakerDTO | undefined;
  sneakers: SneakerDTO[];
}
