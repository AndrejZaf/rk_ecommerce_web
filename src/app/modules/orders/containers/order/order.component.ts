import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderVerificationDTO } from '../../dtos/order-verification.dto';
import { OrderIdentifierDTO } from 'src/app/modules/shopping-cart/dtos/order-identifier.dto';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { OrderStatusKey } from '../../utils/order-status.util';
import { OrderStatus } from 'src/app/modules/shopping-cart/enums/order-status.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderVerificationDTO;
  sneakers: SneakerDTO[];
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          const id = params['id'];
          return this.orderService.fetchOrder(id);
        }),
        switchMap((order: OrderVerificationDTO) => {
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
}
