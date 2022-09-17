import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminGuard } from '../shared/guards/admin.guard';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent,
    AddProductComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    RouterModule.forChild([
      {
        path: 'addproduct',
        component: AddProductComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      { path: ':title', component: ProductsComponent },
      { path: ':title/:name', component: ProductDetailsComponent },
    ]),
  ],
})
export class ProductModule {}
