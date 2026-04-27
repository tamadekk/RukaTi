import { Star, Edit2, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Review } from "@/types/user";
import { ReviewForm } from "../forms/review-form";

interface ReviewCardProps {
  review: Review;
  isOwner?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  isSubmitting?: boolean;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onUpdate?: (rating: number, comment: string) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
}

export const ReviewCard = ({
  review,
  isOwner,
  isEditing,
  isDeleting,
  isSubmitting,
  onEditStart,
  onEditCancel,
  onUpdate,
  onDelete,
}: ReviewCardProps) => {
  if (isEditing) {
    return (
      <ReviewForm
        initialRating={review.review_rating}
        initialComment={review.review_text ?? ""}
        isLoading={isSubmitting}
        onCancel={onEditCancel}
        onSubmit={async (rating, comment) => {
          if (onUpdate) await onUpdate(rating, comment);
        }}
      />
    );
  }

  return (
    <div
      className={`border p-4 bg-white space-y-3 ${isOwner ? "border-2 border-black" : "border-black"}`}
    >
      <div className="flex items-center justify-between">
        <Link
          to="/provider/$userId"
          params={{ userId: review.user_id }}
          className="flex items-center gap-3 group"
        >
          <Avatar className="w-10 h-10 border border-black rounded-none group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <AvatarImage src={review.user_profile?.avatar} />
            <AvatarFallback className="rounded-none bg-gray-200 font-bold">
              {review.user_profile?.full_name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-bold uppercase text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                {review.user_profile?.full_name}
              </div>
              {isOwner && (
                <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-bold uppercase tracking-widest">
                  You
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
        </Link>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.review_rating ? "fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {isOwner && (
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={onEditStart}
                className="text-gray-500 hover:text-black transition-colors"
                title="Edit review"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
                title="Delete review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-700 font-mono leading-relaxed">
        "{review.review_text}"
      </p>
    </div>
  );
};
