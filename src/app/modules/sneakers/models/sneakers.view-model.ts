import { BrandDTO } from '../dtos/brand.dto';
import { SneakerDTO } from '../dtos/sneaker.dto';

export interface SneakersViewModel {
  selectedSneaker: SneakerDTO | undefined;
  sneakers: SneakerDTO[];
  page: number;
  size: number;
  hasMorePages: boolean;
  brands: BrandDTO[];
  sizes: number[];
  genders: string[];
  selectedBrandIds: number[];
  selectedSizes: number[];
  selectedGenders: string[];
  sort: string;
  name: string;
}
