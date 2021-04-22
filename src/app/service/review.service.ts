import { Injectable } from '@angular/core';
import { ReviewRequestDto } from '../model/dto/review-request-dto';
import { SubReviewRequestDto } from '../model/dto/sub-review-request-dto';
import { Review } from '../model/entity/review';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) { }

  postReview(reviewRequestDto: ReviewRequestDto) {
    return this.http.post(`${this.baseUrl}`, reviewRequestDto, {responseType: 'text'});
  }

  getReviewsByProductId(id: number) {
    return this.http.get<Review[]>(`${this.baseUrl}/${id}`);
  }

  getReviewsByEmail(email: string, size: number) {
    return this.http.get<ReviewsResponse>(`${this.baseUrl}?email=${email}&size=${size}`);
  }

  postSubReview(subReviewRequestDto: SubReviewRequestDto) {
    return this.http.post(`${this.baseUrl}/sub`, subReviewRequestDto, {responseType: 'text'});
  }

}

interface ReviewsResponse {
  content: Review[];
  totalElements: number;
}
