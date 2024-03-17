import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successful-purchase',
  templateUrl: './successful-purchase.component.html',
  styleUrls: ['./successful-purchase.component.scss'],
})
export class SuccessfulPurchaseComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToShopping(): void {
    this.router.navigate(['/sneakers']);
  }

  navigateToOrderPreview(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);
      id && this.router.navigate([`/orders/${id}`]);
    });
  }
}
