import { Link } from "@tanstack/react-router";
import { ReviewForm } from "@/components/reviews/review-form";
import type { Review, User } from "@/types/user";
import { Button } from "@/components/ui/button";

interface ServiceReviewsProps {
  reviews: Review[];
  currentUser: User | null;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export const ServiceReviewForm = ({
  reviews,
  currentUser,
  onSubmit,
}: ServiceReviewsProps) => {
  return (
    <div className="space-y-8 pt-8 border-t border-black">
      <div className="flex items-center justify-between border-b border-black pb-2">
        <h2 className="text-xl font-bold uppercase">
          Service Reviews ({reviews.length})
        </h2>
      </div>

      {currentUser ? (
        <ReviewForm onSubmit={onSubmit} />
      ) : (
        <div className="bg-gray-50 border border-black p-6 text-center space-y-4">
          <p className="font-mono text-gray-600">
            Please log in to leave a review.
          </p>
          <Link to="/login">
            <Button
              variant="outline"
              className="rounded-none border-black hover:bg-black hover:text-white transition-all uppercase font-bold tracking-widest"
            >
              Log In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
