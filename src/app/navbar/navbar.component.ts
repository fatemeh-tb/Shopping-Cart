import { Component, OnInit } from '@angular/core';
import { Product } from '../Domain/products.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidenav_opened = false;
  products: Product[];
  totalItems: any = 0

  constructor(private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    })

    this.cartService.getProducts().subscribe(res => {
      this.totalItems = res.length
    })
  }

  onOpenSidenav() {
    this.sidenav_opened = true;
  }

  onCloseSidenav() {
    this.sidenav_opened = false
  }

}
