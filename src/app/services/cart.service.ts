import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductGroup } from '../Domain/productGroup.model';
import { Product } from '../Domain/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.productList
  }

  addToCart(product: Product) {
    if (this.cartItemList.find((i: any) => i.id === product.id)) {
      // product.quantity++;
    } else {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
    }
    // this.storeLocalStorage()
  }

  removeCartItem(id: number) {
    this.cartItemList.splice(id, 1)
    this.productList.next(this.cartItemList);
    localStorage.removeItem('cart');
    // this.storeLocalStorage()
  }

  storeLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItemList))
  }

}
