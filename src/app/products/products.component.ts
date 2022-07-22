import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../Domain/product.model';
import { ProductGroup } from '../Domain/productGroup.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductGroup[];
  productList: Product[];
  productName: any;

  productDetails: Product[] = [];
  onDetails = false;

  searchTerm: string;
  searchKey: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let title = params['title'];
      this.getProductsById(title);
      this.productName = title;
    });

    this.productService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }


  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productService.search.next(this.searchTerm);
  }


  onAddToCart(data: Product) {
    this.productService.addToCart(data);
  }


  onProductDetails(id: number) {
    this.productService.getProductById(id).subscribe((result) => {
      this.productDetails.push(result);
      this.onDetails = true;
    });
  }


  getProductsById(name: any) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i]['title'] == name) {
          this.productList = this.products[i].products;
        }
      }
    });
  }
}
