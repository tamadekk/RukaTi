import { create } from "zustand";
import type { Review, UploadReview } from "@/types/user";
import supabase from "@/supabase-client";

type ServicesReviewsStore = {
  reviews: Review[];
  loadReviews: (serviceId: string) => Promise<void>;
  uploadReview: (review: UploadReview) => void;
};

export const useServicesReviewsStore = create<ServicesReviewsStore>((set) => ({
  reviews: [],
  loadReviews: async (serviceId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_services_reviews")
        .select("*, user_profiles(full_name, avatar)")
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
        .from("user_services_reviews")
        .insert(review);
      if (error) throw error;
      set((state) => ({ reviews: [review as Review, ...state.reviews] }));
    } catch (error) {
      console.error("Error uploading review:", error);
    }
  },
}));
