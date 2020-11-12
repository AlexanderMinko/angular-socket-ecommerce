import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { Review } from 'src/app/model/review';
import { ReviewRequestDto } from 'src/app/model/review-request-dto';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  reviews: Review[];
  reviewFormGroup: FormGroup;
  product: Product;
  productId: number;
  isLogged: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      () => {
        this.productId = +this.activatedRoute.snapshot.params.id;
        this.getProduct();
        this.getReviews();
        this.authService.isLoggedChange
        .subscribe( (data: boolean) => this.isLogged = data);
        this.isLogged = !!this.authService.getAccount();
      });
    this.reviewFormGroup = this.formBuilder.group({
      review: new FormControl('')
    });

  }

  get review() {
    return this.reviewFormGroup.get('review');
  }

  getProduct() {
    this.productService.getProductById(this.productId)
    .subscribe((data: Product) => this.product = data);
  }

  getReviews() {
    this.productService.getReviewsByProductId(this.productId)
    .subscribe( (data: Review[]) => {
      this.reviews = data
    });

  }

  onSubmit() {
    const reviewRequestDto: ReviewRequestDto = new ReviewRequestDto();
    reviewRequestDto.review = this.review.value;
    reviewRequestDto.email = this.authService.getAccount().email;
    reviewRequestDto.productId = this.productId;
    this.productService.postReview(reviewRequestDto)
    .subscribe(data => {
      console.log(data);
      this.reviewFormGroup.reset();
    }, error => {
      console.log(error);
    }, () => {
      this.getReviews();
    });
  }

  onAddToCart() {
    const cartItem: CartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
