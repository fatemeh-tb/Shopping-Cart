import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../../assets/productLists/products.json'
import { Product } from '../Domain/products.model';
import { ProductsList } from '../Domain/productsList.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public search = new BehaviorSubject<string>("");

  products: Product[] = (data as any).default;
  productList: ProductsList[];

  getProducts() {
    return this.http.get('assets/productLists/products.json')
  }

  getProductsById(name: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]["prodName"] == name) {
        this.productList = this.products[i].prodList;
      }
    }
  }

}
