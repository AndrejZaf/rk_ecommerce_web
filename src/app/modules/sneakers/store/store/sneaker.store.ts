import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as sneakersActions from './sneaker.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SneakersViewModel } from '../../models/sneakers.view-model';
import { SneakerService } from '../../services/sneaker.service';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { append, patch } from '@ngxs/store/operators';

export const sneakersState = (): SneakersViewModel => ({
  selectedSneaker: undefined,
  sneakers: [],
  page: 0,
  size: 12,
  hasMorePages: true,
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

  @Selector()
  static hasMorePages(state: SneakersViewModel): boolean {
    return state.hasMorePages;
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
  loadSneakers(
    { dispatch }: StateContext<SneakersViewModel>,
    { page, size }: sneakersActions.LoadSneakers
  ): Observable<void | SneakerDTO[] | Observable<void>> {
    return from(this.sneakerService.loadSneakers(page, size)).pipe(
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

  @Action(sneakersActions.LoadSneakersPage)
  loadSneakersPage({
    dispatch,
    setState,
    getState,
  }: StateContext<SneakersViewModel>): Observable<
    void | SneakerDTO[] | Observable<void>
  > {
    return from(
      this.sneakerService.loadSneakers(getState().page, getState().size)
    ).pipe(
      map((data: SneakerDTO[]) => {
        dispatch(new sneakersActions.LoadSneakersPageSuccess(data));
        setState(
          patch({
            page: (page) => page + 1,
          })
        );
      }),
      catchError((err: HttpErrorResponse) =>
        dispatch(new sneakersActions.LoadSneakersPageFail(err))
      )
    );
  }

  @Action(sneakersActions.LoadSneakersPageSuccess)
  loadSneakersPageSuccess(
    { setState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadSneakersPageSuccess
  ): void {
    setState(
      patch({
        sneakers: append(payload),
        hasMorePages: payload.length !== 0,
      })
    );
  }
}
