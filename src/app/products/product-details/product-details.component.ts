import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsList } from 'src/app/Domain/productsList.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product: ProductsList[] = [];

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let prodName = params['prodName'];
      this.productService.getProductsById(prodName)

      let name = params['name'];
      this.product.push(this.productService.getProduct(name))
    });
  }

  onAddToCart(data: ProductsList) {
    this.snackBar.open('Item added successfully', 'Got It!', {
      duration: 3000,
      verticalPosition: 'top'
    })
    this.cartService.addToCart(data)
  }
}
