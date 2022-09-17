import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/Domain/productGroup.model';
import { Product } from 'src/app/Domain/product.model';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productData: Product = new Product();
  ProductGroupData: ProductGroup[];
  public claims: boolean = false;

  constructor(
    public productService: ProductService,
    private repository: RepositoryService
  ) {}

  ngOnInit(): void {
    this.getClaims();
    this.productService.getProducts().subscribe((res) => {
      this.ProductGroupData = res;
    });
  }

  public getClaims = () => {
    this.repository.getClaims('api/authentication/admin').subscribe((res) => {
      this.claims = true;
    });
  };

  onSubmit(form: NgForm) {
    const data: Product = form.value;
    this.productService.addProduct(data).subscribe((res) => {
      form.reset();
    });
  }
}
