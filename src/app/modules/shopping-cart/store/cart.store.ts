import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CartViewModel } from '../models/cart.view-model';
import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { CartService } from '../services/cart.service';
import * as cartActions from './cart.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const cartState = (): CartViewModel => ({
  cartSneakers: [],
  cartDeliveryData: undefined,
});

@State<CartViewModel>({
  name: 'cartState',
  defaults: cartState(),
})
@Injectable()
export class CartState {
  @Selector()
  static cartSneakers(state: CartViewModel): SneakerDTO[] {
    return state.cartSneakers;
  }

  constructor(private cartService: CartService) {}

  @Action(cartActions.LoadCartSneakers)
  loadCartSneakers(
    { dispatch }: StateContext<CartViewModel>,
    { payload }: cartActions.LoadCartSneakers
  ): Observable<void | SneakerDTO[] | Observable<void>> {
    return from(this.cartService.getSneakersForCart(payload)).pipe(
      map((data: SneakerDTO[]) =>
        dispatch(new cartActions.LoadCartSneakersSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new cartActions.LoadCartSneakersFail(err))
      )
    );
  }

  @Action(cartActions.LoadCartSneakersSuccess)
  loadCartSneakersSuccess(
    { patchState }: StateContext<CartViewModel>,
    { payload }: cartActions.LoadCartSneakersSuccess
  ): void {
    patchState({ cartSneakers: payload });
  }

  @Action(cartActions.RemoveSneaker)
  removeSneaker(
    { patchState, getState }: StateContext<CartViewModel>,
    { payload }: cartActions.RemoveSneaker
  ): void {
    const newCartState = getState().cartSneakers.filter(
      (sneaker) => sneaker.id !== payload
    );
    patchState({ cartSneakers: newCartState });
  }
}
