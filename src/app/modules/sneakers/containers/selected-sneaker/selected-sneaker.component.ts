import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import * as sneakersActions from '../../store/sneaker.actions';
import { SneakerState } from '../../store/sneaker.store';
import { CartItemDTO } from './../../dtos/cart-item.dto';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-selected-sneaker',
  templateUrl: './selected-sneaker.component.html',
  styleUrls: ['./selected-sneaker.component.scss'],
})
export class SelectedSneakerComponent implements OnInit, OnDestroy {
  public selectedSneaker: SneakerDTO | undefined;
  public selectedSize: number | undefined;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.store.select(SneakerState.selectedSneaker).subscribe((sneaker) => {
      this.selectedSneaker = sneaker;
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id && this.loadData(+id);
    });
  }

  addSneakerToCart() {
    if (!this.selectedSize) {
      console.error('Select size');
      return;
    }

    const cartItem: CartItemDTO = {
      sneakerId: this.selectedSneaker?.id,
      size: this.selectedSize,
    };
    this.storageService.addItemsToCart(cartItem);
  }

  selectNewSize(size: number) {
    if (this.selectedSize === size) {
      this.selectedSize = 0;
    } else {
      this.selectedSize = size;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new sneakersActions.ResetStore());
  }

  private loadData(id: number): void {
    this.store.dispatch(new sneakersActions.LoadSneaker(id));
  }
}
