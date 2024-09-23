import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed-purchase',
  templateUrl: './failed-purchase.component.html',
  styleUrls: ['./failed-purchase.component.scss'],
})
export class FailedPurchaseComponent {
  constructor(private router: Router) {}

  returnBack(): void {
    history.back();
  }
}
