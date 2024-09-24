import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CartStorageService } from 'src/app/shared/services/cart-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navItems = [
    { link: '/sneakers', title: 'Sneakers' },
    { link: '/brands', title: 'Brands' },
    { link: '/contact', title: 'Contact' },
  ];
  isCollapsed = true;
  public isLoggedIn = false;
  totalItems = 0;

  constructor(
    private router: Router,
    private cartStorageService: CartStorageService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.cartStorageService.watchStorage().subscribe(() => {
      const cartFromStorage = localStorage.getItem('cart');
      if (cartFromStorage) {
        const items = JSON.parse(cartFromStorage);
        this.totalItems = items.length;
      }
    });

    this.isUserLoggedIn();
  }

  ngOnDestroy(): void {
    this.cartStorageService.watchStorage().subscribe((key) => {
      console.log('LocalStorage changed for key:', key);
    });
  }

  navigateToCart(): void {
    this.router.navigate(['/shopping-cart']);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateToLogin(): void {
    this.keycloakService.login();
  }

  isUserLoggedIn(): void {
    this.keycloakService
      .isLoggedIn()
      .then((loggedIn) => {
        this.isLoggedIn = !loggedIn;
      })
      .catch((err) => {
        console.log(err);
        this.isLoggedIn = false;
      });
  }

  logout(): void {
    this.keycloakService.logout();
    this.isLoggedIn = true;
    this.router.navigate(['/']);
  }
}
