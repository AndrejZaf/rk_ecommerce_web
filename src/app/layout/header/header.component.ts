import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems = [
    { link: '/sneakers', title: 'Sneakers' },
    { link: '/brands', title: 'Brands' },
    { link: '/contact', title: 'Contact' },
  ];
  isCollapsed = true;

  constructor(private router: Router) {}

  navigateToCart(): void {
    this.router.navigate(['/shopping-cart']);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
