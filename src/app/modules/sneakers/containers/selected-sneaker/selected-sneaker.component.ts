import { Component, OnInit } from '@angular/core';
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
export class SelectedSneakerComponent implements OnInit {
  public selectedSneaker$: Observable<SneakerDTO | undefined>;
  public selectedSize: number;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.selectedSneaker$ = this.store.select(SneakerState.selectedSneaker);
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id && this.loadData(+id);
    });
  }

  addSneakerToCart() {
    this.selectedSneaker$.subscribe((sneaker) => {
      const cartItem: CartItemDTO = {
        sneakerId: sneaker?.id,
        size: this.selectedSize,
      };
      this.storageService.addItemsToCart(cartItem);
      console.log(cartItem);
    });
  }

  selectNewSize(size: number) {
    if (!this.selectedSize) {
      this.selectedSize = size;
    } else {
      this.selectedSize = -1;
    }
  }

  private loadData(id: number): void {
    this.store.dispatch(new sneakersActions.LoadSneaker(id));
  }
}
