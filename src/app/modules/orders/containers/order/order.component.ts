import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderPreviewDTO } from '../../dtos/order-preview.dto';
import { SneakerDTO } from '../../dtos/sneaker.dto';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderPreviewDTO;
  sneakers: SneakerDTO[];
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // TODO: Create a store for this fetch
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          const id = params['id'];
          return this.orderService.fetchOrder(id);
        }),
        switchMap((order: OrderPreviewDTO) => {
          this.order = order;
          const sneakerIds = order.orderInventory.map(
            (orderInv) => orderInv.sneakerId
          );
          return this.orderService.getSneakersForOrder(sneakerIds);
        })
      )
      .subscribe({
        next: (sneakers) => {
          this.sneakers = sneakers;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  orderStatusName(orderStatus: string) {
    const readableStatus = orderStatus.replaceAll('_', ' ');
    return (
      readableStatus[0].toUpperCase() + readableStatus.slice(1).toLowerCase()
    );
  }
}
