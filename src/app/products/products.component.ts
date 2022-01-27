import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsList } from '../Domain/productsList.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: ProductsList[];

  searchTerm: string;
  searchKey: string = "";

  constructor(private cartService: CartService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let prodName = params['prodName'];
      this.productService.getProductsById(prodName);
      this.products = this.productService.productList
    });

    this.productService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.productService.search.next(this.searchTerm);
  }


  onAddToCart(data: ProductsList) {
    this.snackBar.open('Item added successfully', 'Got It!', {
      duration: 3000,
      verticalPosition: 'top'
    })
    this.cartService.addToCart(data)
  }

}
