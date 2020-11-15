import { SubReview } from './sub-review';

export class Review {
    id: number;
    review: string;
    duration: string;
    countOfSubReview: number;
    reviewerFirstName: string;
    reviewerLastName: string;
    reviewerPhotoUrl: string;
    subReviewResponseDtos: SubReview[];
}