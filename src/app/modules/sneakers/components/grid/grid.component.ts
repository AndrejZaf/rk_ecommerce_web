import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() sneakers: SneakerDTO[] | null = [];
  @Input() hasMorePages: boolean | null = true;
  @Output() scrollPage = new EventEmitter<void>();

  constructor(private router: Router) {}

  redirectToSneaker(sneakerId: number) {
    this.router.navigate([`/sneakers/${sneakerId}`]);
  }
}
