import { Component, OnInit } from '@angular/core';
import { Product } from '../Domain/products.model';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})

export class ProdutsComponent implements OnInit {

  quantity: number
  products: Product[] = []
  public productList: any;

  constructor(private cartService: CartService,
    private productService: ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.products.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.price });
    });
  }

  onAddToCart(data: any) {
    this.snackBar.open('Item added successfully', 'Got It!', {
      duration: 3000,
      verticalPosition: 'top'
    })
    this.cartService.addToCart(data)
  }

}
