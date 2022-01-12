import { Injectable } from '@angular/core';
import * as data from '../../assets/productLists/CBDOIL.json'
import { Product } from '../Domain/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  products: Product[] = (data as any).default;

  getProducts() {
    return this.products;
  }
}
