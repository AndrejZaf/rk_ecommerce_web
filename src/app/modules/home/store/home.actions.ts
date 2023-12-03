import { HttpErrorResponse } from '@angular/common/http';
import { PremiumSneakerDTO } from '../dtos/premium-sneaker.dto';
import { SneakerDTO } from '../dtos/sneaker.dto';

export class LoadPremiumSneaker {
  static readonly type = '[Home] Load Premium Sneaker';
}

export class LoadPremiumSneakerSuccess {
  static readonly type = '[Home] Load Premium Sneaker Success';
  constructor(readonly payload: PremiumSneakerDTO) {}
}

export class LoadPremiumSneakerFail {
  static readonly type = '[Home] Load Premium Sneaker Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class LoadSneakers {
  static readonly type = '[Home] Load Sneakers';
}

export class LoadSneakersSuccess {
  static readonly type = '[Home] Load Sneakers Success';
  constructor(readonly payload: SneakerDTO[]) {}
}

export class LoadSneakersFail {
  static readonly type = '[Home] Load Sneakers Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}
