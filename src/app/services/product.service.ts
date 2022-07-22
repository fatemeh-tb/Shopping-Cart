import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Domain/product.model';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  public search = new BehaviorSubject<string>('');

  private baseUrl: string = "https://localhost:5000"


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl +'/all');
  }


  getProductById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/product' + '/' + id);
  }


  addProduct(product: Product) {
    this.snackBar.open('Item added successfully', 'Got It!', {
      duration: 3000,
      verticalPosition: 'top',
    });
    return this.http.post<Product>(this.baseUrl + "/product", product, this.httpOptions)
  }


  addToCart(data: Product) {
    this.snackBar.open('Item added successfully', 'Got It!', {
      duration: 3000,
      verticalPosition: 'top',
    });
    this.cartService.addToCart(data);
  }
}
