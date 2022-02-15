import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  {path: 'products/:prodName', component: ProductsComponent},
  { path: 'products/:prodName/:name', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
