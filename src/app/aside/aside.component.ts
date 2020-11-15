import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../model/entity/category';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
      });
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`search/${value.trim()}`);
  }

}
