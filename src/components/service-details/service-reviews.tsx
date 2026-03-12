import type { Review, User } from "@/types/user";
import { ReviewCard } from "@/components/reviews/review-card";

type ServiceReviewsProps = {
  reviews: Review[];
  currentUser: User | null;
  editingReviewId: string | null;
  isDeleting: boolean;
  isSubmitting: boolean;
  onEditStart: (reviewId: string) => void;
  onEditCancel: () => void;
  onUpdate: (
    reviewId: string,
    rating: number,
    comment: string,
  ) => Promise<void> | void;
  onDelete: (reviewId: string) => Promise<void> | void;
};

export const ServiceReviews = ({
  reviews,
  currentUser,
  editingReviewId,
  isDeleting,
  isSubmitting,
  onEditStart,
  onEditCancel,
  onUpdate,
  onDelete,
}: ServiceReviewsProps) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          review={review}
          isOwner={currentUser?.id === review.user_id}
          isEditing={editingReviewId === review.review_id}
          isDeleting={isDeleting && editingReviewId === review.review_id}
          isSubmitting={isSubmitting && editingReviewId === review.review_id}
          onEditStart={() => onEditStart(review.review_id)}
          onEditCancel={onEditCancel}
          onUpdate={(rating, comment) =>
            onUpdate(review.review_id, rating, comment)
          }
          onDelete={() => onDelete(review.review_id)}
        />
      ))}
      {reviews.length === 0 && (
        <div className="text-center text-gray-500 italic py-8 border border-dashed border-gray-300">
          No reviews yet. Be the first to review!
        </div>
      )}
    </div>
  );
};
