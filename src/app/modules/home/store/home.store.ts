import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as homeActions from './home.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeService } from '../services/home.service';
import { HomeViewModel } from '../models/home.view-model';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { PremiumSneakerDTO } from '../dtos/premium-sneaker.dto';

export const homeState = (): HomeViewModel => ({
  premiumSneaker: undefined,
  sneakers: [],
});

@State<HomeViewModel>({
  name: 'homeState',
  defaults: homeState(),
})
@Injectable()
export class HomeState {
  @Selector()
  static sneakers(state: HomeViewModel): SneakerDTO[] {
    return state.sneakers;
  }

  @Selector()
  static premiumSneaker(state: HomeViewModel): PremiumSneakerDTO | undefined {
    return state.premiumSneaker;
  }

  constructor(private homeService: HomeService) {}

  @Action(homeActions.LoadPremiumSneaker)
  loadPremiumSneaker({
    dispatch,
  }: StateContext<HomeViewModel>): Observable<
    void | PremiumSneakerDTO | Observable<void>
  > {
    return from(this.homeService.loadPremiumSneaker()).pipe(
      map((data: PremiumSneakerDTO) =>
        dispatch(new homeActions.LoadPremiumSneakerSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new homeActions.LoadPremiumSneakerFail(err))
      )
    );
  }

  @Action(homeActions.LoadPremiumSneakerSuccess)
  loadPremiumSneakerSuccess(
    { patchState }: StateContext<HomeViewModel>,
    { payload }: homeActions.LoadPremiumSneakerSuccess
  ): void {
    patchState({ premiumSneaker: payload });
  }

  @Action(homeActions.LoadSneakers)
  loadSneakers({
    dispatch,
  }: StateContext<HomeViewModel>): Observable<
    void | SneakerDTO[] | Observable<void>
  > {
    return from(this.homeService.loadSneakers()).pipe(
      map((data: SneakerDTO[]) =>
        dispatch(new homeActions.LoadSneakersSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new homeActions.LoadSneakersFail(err))
      )
    );
  }

  @Action(homeActions.LoadSneakersSuccess)
  loadSneakersSuccess(
    { patchState }: StateContext<HomeViewModel>,
    { payload }: homeActions.LoadSneakersSuccess
  ): void {
    patchState({ sneakers: payload });
  }
}
