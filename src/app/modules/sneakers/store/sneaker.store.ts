import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as sneakersActions from './sneaker.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SneakersViewModel } from '../models/sneakers.view-model';
import { SneakerService } from '../services/sneaker.service';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { append, patch } from '@ngxs/store/operators';
import { BrandDTO } from '../dtos/brand.dto';
import { BrandService } from '../services/brand.service';
import { SneakerSizeService } from '../services/sneaker-size.service';

export const sneakersState = (): SneakersViewModel => ({
  selectedSneaker: undefined,
  sneakers: [],
  page: 0,
  size: 12,
  hasMorePages: true,
  brands: [],
  sizes: [],
  genders: [],
  selectedBrandIds: [],
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

  @Selector()
  static brands(state: SneakersViewModel): BrandDTO[] {
    return state.brands;
  }

  @Selector()
  static sizes(state: SneakersViewModel): number[] {
    return state.sizes;
  }

  constructor(
    private sneakerService: SneakerService,
    private brandService: BrandService,
    private sneakerSizeService: SneakerSizeService
  ) {}

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
      this.sneakerService.loadSneakers(
        getState().page,
        getState().size,
        getState().selectedBrandIds
      )
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

  @Action(sneakersActions.LoadBrands)
  loadBrands({
    dispatch,
  }: StateContext<SneakersViewModel>): Observable<
    void | BrandDTO[] | Observable<void>
  > {
    return from(this.brandService.loadBrands()).pipe(
      map((data: BrandDTO[]) =>
        dispatch(new sneakersActions.LoadBrandsSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new sneakersActions.LoadBrandsFail(err))
      )
    );
  }

  @Action(sneakersActions.LoadBrandsSuccess)
  loadBrandsSuccess(
    { patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadBrandsSuccess
  ): void {
    patchState({ brands: payload });
  }

  @Action(sneakersActions.LoadSizes)
  loadSizes({
    dispatch,
  }: StateContext<SneakersViewModel>): Observable<
    void | number[] | Observable<void>
  > {
    return from(this.sneakerSizeService.loadSneakerSizes()).pipe(
      map((data: number[]) =>
        dispatch(new sneakersActions.LoadSizesSuccess(data))
      ),
      catchError((err: HttpErrorResponse) =>
        dispatch(new sneakersActions.LoadSizesFail(err))
      )
    );
  }

  @Action(sneakersActions.LoadSizesSuccess)
  loadSizesSuccess(
    { patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadSizesSuccess
  ): void {
    patchState({ sizes: payload });
  }

  @Action(sneakersActions.SelectBrandsIds)
  selectBrandIds(
    { patchState, dispatch }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.SelectBrandsIds
  ): void {
    patchState({ selectedBrandIds: payload, page: 0, sneakers: [] });
    dispatch(new sneakersActions.LoadSneakersPage());
  }
}
