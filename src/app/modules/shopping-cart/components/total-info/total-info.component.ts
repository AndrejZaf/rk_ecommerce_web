import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-total-info',
  templateUrl: './total-info.component.html',
  styleUrls: ['./total-info.component.scss'],
})
export class TotalInfoComponent implements OnInit {
  @Output()
  checkout: EventEmitter<void> = new EventEmitter();
  @Input()
  isValid: boolean;
  @Input()
  sneakers: SneakerDTO[] | null;
  public isButtonDisabled = false;

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  constructor(private keycloakService: KeycloakService) {}

  isUserLoggedIn(): void {
    this.keycloakService
      .isLoggedIn()
      .then((isLoggedIn) => {
        this.isButtonDisabled = !isLoggedIn;
      })
      .catch((err) => {
        console.log(err);
        this.isButtonDisabled = false;
      });
  }

  calculateTotalPrice(): number {
    if (this.sneakers?.length) {
      return this.sneakers
        .map((sneaker) => sneaker.price)
        .reduce((total, item) => total + item);
    }
    return 0;
  }
}
