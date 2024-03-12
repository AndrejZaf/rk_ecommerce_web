import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderStatus } from '../../enums/order-status.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  orderId: string | null;
  totalPrice: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.cartService.verifyOrder(this.orderId).subscribe({
        next: (orderVerification) => {
          if (
            orderVerification.orderStatus === OrderStatus.ORDER_CANCELLED ||
            orderVerification.orderStatus === OrderStatus.ORDER_PAID
          ) {
            this.router.navigate(['']);
          }
          this.totalPrice = orderVerification.orderPrice;
        },
        error: (_) => this.router.navigate(['']),
      });
    } else {
      this.router.navigate(['']);
    }
  }

  pay(orderId: string): void {
    this.cartService.payOrder(orderId).subscribe({
      next: (session) => {
        window.location.href = session.stripeSessionUrl;
      },
      error: (_) => console.error('Error'),
    });
  }
}
