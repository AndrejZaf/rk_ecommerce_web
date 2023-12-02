import { Component } from '@angular/core';

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
}
