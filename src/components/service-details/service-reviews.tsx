import type { Review } from "@/types/user";
import { ReviewCard } from "@/components/reviews/review-card";

type ServiceReviewsProps = {
  reviews: Review[];
};

export const ServiceReviews = ({ reviews }: ServiceReviewsProps) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} />
      ))}
      {reviews.length === 0 && (
        <div className="text-center text-gray-500 italic py-8 border border-dashed border-gray-300">
          No reviews yet. Be the first to review!
        </div>
      )}
    </div>
  );
};
