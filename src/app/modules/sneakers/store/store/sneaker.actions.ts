import { HttpErrorResponse } from '@angular/common/http';
import { SneakerDTO } from '../../dtos/sneaker.dto';

export class LoadSneaker {
  static readonly type = '[Sneakers] Load Selected Sneaker';
  constructor(readonly payload: number) {}
}

export class LoadSneakerSuccess {
  static readonly type = '[Sneakers] Load Selected Sneaker Success';
  constructor(readonly payload: SneakerDTO) {}
}

export class LoadSneakerFail {
  static readonly type = '[Sneakers] Load Selected Sneaker Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class LoadSneakers {
  static readonly type = '[Sneakers] Load Sneakers';
}

export class LoadSneakersSuccess {
  static readonly type = '[Sneakers] Load Sneakers Success';
  constructor(readonly payload: SneakerDTO[]) {}
}

export class LoadSneakersFail {
  static readonly type = '[Sneakers] Load Sneakers Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}
