import { HttpErrorResponse } from '@angular/common/http';
import { SneakerDTO } from '../dtos/sneaker.dto';

export class LoadCartSneakers {
  static readonly type = '[Cart] Load Cart Sneakers';
  constructor(readonly payload: number[]) {}
}

export class LoadCartSneakersSuccess {
  static readonly type = '[Cart] Load Cart Sneakers Success';
  constructor(readonly payload: SneakerDTO[]) {}
}

export class LoadCartSneakersFail {
  static readonly type = '[Cart] Load Cart Sneakers Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class RemoveSneaker {
  static readonly type = '[Cart] Remove Sneaker';
  constructor(readonly payload: number) {}
}
