import { SneakerDTO } from '../dtos/sneaker.dto';

export interface SneakersViewModel {
  selectedSneaker: SneakerDTO | undefined;
  sneakers: SneakerDTO[];
}
