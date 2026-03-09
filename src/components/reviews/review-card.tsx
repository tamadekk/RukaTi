import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Review } from "@/types/user";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border border-black p-4 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-black rounded-none">
            <AvatarImage src={review.user_profiles?.avatar} />
            <AvatarFallback className="rounded-none bg-gray-200 font-bold">
              {review.user_profiles?.full_name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold uppercase text-sm tracking-tight">
              {review.user_profiles?.full_name}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
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
      </div>
      <p className="text-sm text-gray-700 font-mono leading-relaxed">
        "{review.review_text}"
      </p>
    </div>
  );
};
