import { create } from "zustand";
import type { Review, UploadReview } from "@/types/user";
import supabase from "@/supabase-client";

type ServicesReviewsStore = {
  reviews: Review[];
  loadReviews: (serviceId: string) => Promise<void>;
  uploadReview: (review: UploadReview) => Promise<void>;
  updateReview: (
    reviewId: string,
    updates: Partial<UploadReview>,
  ) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
};

export const useServicesReviewsStore = create<ServicesReviewsStore>((set) => ({
  reviews: [],
  loadReviews: async (serviceId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_service_review")
        .select("*, user_profile(full_name, avatar)")
        .eq("service_id", serviceId);
      if (error) throw error;
      set({ reviews: data });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  },
  uploadReview: async (review: UploadReview) => {
    try {
      const { error } = await supabase
        .from("user_service_review")
        .insert(review);
      if (error) throw error;

      const { data: newReviewData, error: fetchError } = await supabase
        .from("user_service_review")
        .select("*, user_profile(full_name, avatar)")
        .eq("review_id", review.review_id)
        .single();

      if (fetchError) throw fetchError;

      set((state) => ({
        reviews: [newReviewData as Review, ...state.reviews],
      }));
    } catch (error) {
      console.error("Error uploading review:", error);
      throw error;
    }
  },
  updateReview: async (reviewId: string, updates: Partial<UploadReview>) => {
    try {
      const { error } = await supabase
        .from("user_service_review")
        .update(updates)
        .eq("review_id", reviewId);
      if (error) throw error;
      set((state) => ({
        reviews: state.reviews.map((r) =>
          r.review_id === reviewId ? { ...r, ...updates } : r,
        ),
      }));
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  },
  deleteReview: async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("user_service_review")
        .delete()
        .eq("review_id", reviewId);
      if (error) throw error;
      set((state) => ({
        reviews: state.reviews.filter((r) => r.review_id !== reviewId),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  },
}));
