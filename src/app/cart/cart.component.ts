import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert';
import { ProductsList } from '../Domain/productsList.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  total: number;

  constructor(private cartService: CartService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (localStorage['cart']) {
      let cartlist = JSON.parse(localStorage.getItem('cart') || '');
      this.cartService.cartItemList = cartlist;
    }

    this.products = this.cartService.cartItemList;
    this.totalPrice();
  }

  onRemoveItem(id: number) {
    swal({
      dangerMode: true,
      title: 'Delete Item',
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
    }).then((isConfirm) => {
      if (isConfirm === true) {
        this.cartService.removeCartItem(id);
        swal(
          'Deleted!',
          'Your selected item has been deleted successfully.',
          'success'
        );
        this.totalPrice();
      }
    });
  }

  incQuantity(quant: ProductsList) {
    quant.quantity++;
    this.totalPrice();
    this.cartService.storeLocalStorage();
  }

  decQuantity(quant: ProductsList) {
    quant.quantity--;
    this.totalPrice();
    this.cartService.storeLocalStorage();
  }


  totalPrice() {
    this.total = this.products.reduce(
      (acc: any, prod: ProductsList) => (acc += prod.price * prod.quantity),
      0
    );
  }
}
