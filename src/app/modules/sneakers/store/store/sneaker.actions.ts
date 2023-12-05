import { HttpErrorResponse } from '@angular/common/http';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { BrandDTO } from '../../dtos/brand.dto';

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
  constructor(readonly page: number, readonly size: number) {}
}

export class LoadSneakersSuccess {
  static readonly type = '[Sneakers] Load Sneakers Success';
  constructor(readonly payload: SneakerDTO[]) {}
}

export class LoadSneakersFail {
  static readonly type = '[Sneakers] Load Sneakers Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class LoadSneakersPage {
  static readonly type = '[Sneakers] Load Sneakers Page';
}

export class LoadSneakersPageSuccess {
  static readonly type = '[Sneakers] Load Sneakers Page Success';
  constructor(readonly payload: SneakerDTO[]) {}
}

export class LoadSneakersPageFail {
  static readonly type = '[Sneakers] Load Sneakers Page Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class IncrementSneakersPage {
  static readonly type = '[Sneakers] Increment Page';
}

export class LoadBrands {
  static readonly type = '[Sneakers] Load Brands';
}

export class LoadBrandsSuccess {
  static readonly type = '[Sneakers] Load Brands Success';
  constructor(readonly payload: BrandDTO[]) {}
}

export class LoadBrandsFail {
  static readonly type = '[Sneakers] Load Brands Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class LoadSizes {
  static readonly type = '[Sneakers] Load Sizes';
}

export class LoadSizesSuccess {
  static readonly type = '[Sneakers] Load Sizes Success';
  constructor(readonly payload: number[]) {}
}

export class LoadSizesFail {
  static readonly type = '[Sneakers] Load Sizes Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}
