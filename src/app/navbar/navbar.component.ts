import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidenav_opened=false;

  public totalItems: number = 0
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.totalItems = res.length
    })
  }

  onOpenSidenav() {
    this.sidenav_opened = true;
  }

  onCloseSidenav() {
    this.sidenav_opened = false
  }

}
