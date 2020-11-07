import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  page: number = 1;
  size: number = 12;
  totalElemets: number = 0;

  currentCategoryId: number;
  previousCatgoryId: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
        this.showListProducts();
    });
  }

  showListProducts() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = this.activatedRoute.snapshot.params.id;
      if(this.currentCategoryId != this.previousCatgoryId) {
        this.size = 12;
      }
      this.previousCatgoryId = this.currentCategoryId;
      this.productService.getProductsByCategory(this.currentCategoryId, this.page, this.size)
        .subscribe(data => {
          this.products = data.content;
          this.totalElemets = data.totalElements;
        });
    } else {
      this.productService.getProducts(this.page, this.size)
      .subscribe(data => {
          this.products = data.content;
          this.totalElemets = data.totalElements;
        }); 
    }
  }

  loadMore() {
    if (this.totalElemets > this.size) {
      this.size += 12;
      this.showListProducts();
    }
  }

}
