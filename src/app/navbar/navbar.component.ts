import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductGroup } from '../Domain/productGroup.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sidenav_opened = false;
  products: ProductGroup[];
  totalItems: any = 0;

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });

    this.cartService.getProducts().subscribe((res) => {
      this.totalItems = res.length;
    });

    this.userSub = this.authService.authChangeSub.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onOpenSidenav() {
    this.sidenav_opened = true;
  }

  onCloseSidenav() {
    this.sidenav_opened = false;
  }

  onLogout() {
    this.authService.logout();
  }
}
