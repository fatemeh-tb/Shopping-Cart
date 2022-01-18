import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../Domain/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: Product) {
    if (this.cartItemList.find((i: any) => i.id === product.id)) {
      product.quantity++;
    } else {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
    }
  }

  removeCartItem(id: number) {
    this.cartItemList.splice(id, 1)
    this.productList.next(this.cartItemList);
  }
}
