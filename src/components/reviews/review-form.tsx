import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useAsyncAction } from "@/hooks/use-async-action";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isLoading, execute } = useAsyncAction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }

    await execute(
      async () => {
        await onSubmit(rating, comment);
        setRating(0);
        setComment("");
      },
      {
        successMessage: "Review submitted successfully!",
        errorMessage: "Failed to submit review",
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black p-6 bg-gray-50 space-y-4"
    >
      <h3 className="font-bold uppercase tracking-tight">Write a Review</h3>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            className="focus:outline-none transition-colors"
          >
            <Star
              className={`w-6 h-6 ${
                i < rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-500 font-mono">
          {rating > 0
            ? `${rating} star${rating > 1 ? "s" : ""}`
            : "Select rating"}
        </span>
      </div>

      <Textarea
        placeholder="Share your experience with this provider..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px] border-black rounded-none resize-none font-mono"
        disabled={isLoading}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto uppercase font-bold tracking-widest rounded-none"
      >
        {isLoading ? "Submitting..." : "Post Review"}
      </Button>
    </form>
  );
};
