import { Component, ElementRef, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert';
import { Product } from '../Domain/products.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal !: number;
  dogMode = false;

  constructor(private cartService: CartService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
      })
  }

  async onRemoveItem(id: number) {
    swal({
      dangerMode: true,
      title: 'Delete Item',
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes']
    }).then((isConfirm) => {
      if (isConfirm === true) {
        this.cartService.removeCartItem(id)
        swal(
          'Deleted!',
          'Your selected item has been deleted successfully.',
          'success'
        )
      }
    })
  }

  incQuantity(quant: Product) {
    quant.quantity++;
  }

  decQuantity(quant: Product) {
    quant.quantity--;
  }

}
