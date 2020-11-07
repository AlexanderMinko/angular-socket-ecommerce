import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
      });
  }

}
