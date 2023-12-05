import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import * as sneakersActions from '../../store/sneaker.actions';
import { Store } from '@ngxs/store';
import { SneakerState } from '../../store/sneaker.store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() sneakers: SneakerDTO[] | null = [];
  @Input() hasMorePages: boolean | null = true;
  @Output() onScroll = new EventEmitter<void>();

  constructor(private router: Router) {}

  redirectToSneaker(sneakerId: number) {
    this.router.navigate([`/sneakers/${sneakerId}`]);
  }
}
