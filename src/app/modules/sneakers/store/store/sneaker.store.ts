import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as sneakersActions from './sneaker.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SneakersViewModel } from '../../models/sneakers.view-model';
import { SneakerService } from '../../services/sneaker.service';
import { SneakerDTO } from '../../dtos/sneaker.dto';

export const sneakersState = (): SneakersViewModel => ({
  selectedSneaker: undefined,
  sneakers: [],
});

@State<SneakersViewModel>({
  name: 'sneakersState',
  defaults: sneakersState(),
})
@Injectable()
export class SneakerState {
  @Selector()
  static sneakers(state: SneakersViewModel): SneakerDTO[] {
    return state.sneakers;
  }

  @Selector()
  static selectedSneaker(state: SneakersViewModel): SneakerDTO | undefined {
    return state.selectedSneaker;
  }

  constructor(private sneakerService: SneakerService) {}

  @Action(sneakersActions.LoadSneaker)
  loadSneaker(
    { dispatch }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadSneaker
  ): Observable<void | SneakerDTO | Observable<void>> {
    return from(this.sneakerService.loadSelectedSneaker(payload)).pipe(
      map((data: SneakerDTO) =>
        dispatch(new sneakersActions.LoadSneakerSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new sneakersActions.LoadSneakerFail(err))
      )
    );
  }

  @Action(sneakersActions.LoadSneakerSuccess)
  loadSneakerSuccess(
    { patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadSneakerSuccess
  ): void {
    patchState({ selectedSneaker: payload });
  }

  @Action(sneakersActions.LoadSneakers)
  loadSneakers({
    dispatch,
  }: StateContext<SneakersViewModel>): Observable<
    void | SneakerDTO[] | Observable<void>
  > {
    return from(this.sneakerService.loadSneakers()).pipe(
      map((data: SneakerDTO[]) =>
        dispatch(new sneakersActions.LoadSneakersSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new sneakersActions.LoadSneakersFail(err))
      )
    );
  }

  @Action(sneakersActions.LoadSneakersSuccess)
  loadSneakersSuccess(
    { patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadSneakersSuccess
  ): void {
    patchState({ sneakers: payload });
  }
}
