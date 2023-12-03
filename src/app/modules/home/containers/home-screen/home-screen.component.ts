import { Component, OnInit } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { PremiumSneakerDTO } from '../../dtos/premium-sneaker.dto';
import * as homeActions from '../../store/home.actions';
import { Store } from '@ngxs/store';
import { HomeState } from '../../store/home.store';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
  public sneakers!: Observable<SneakerDTO[]>;
  public premiumSneaker!: Observable<PremiumSneakerDTO | undefined>;

  constructor(private store: Store) {
    this.premiumSneaker = this.store.select(HomeState.premiumSneaker);
    this.sneakers = this.store.select(HomeState.sneakers);
  }

  async ngOnInit(): Promise<void> {
    this.loadData();
  }

  private loadData(): void {
    this.store.dispatch(new homeActions.LoadPremiumSneaker());
    this.store.dispatch(new homeActions.LoadSneakers());
  }
}
