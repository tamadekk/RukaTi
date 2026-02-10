import { create } from "zustand";
import type { Review } from "@/types/user";
import supabase from "@/supabase-client";

type ServicesReviewsStore = {
  reviews: Review[];
  loadReviews: (serviceId: string) => Promise<void>;
  uploadReview: (review: Review) => void;
};

export const useServicesReviewsStore = create<ServicesReviewsStore>((set) => ({
  reviews: [],
  loadReviews: async (serviceId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_services_reviews")
        .select("*")
        .eq("service_id", serviceId);
      if (error) throw error;
      set({ reviews: data });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  },
  uploadReview: async (review: Review) => {
    try {
      const { error } = await supabase
        .from("user_services_reviews")
        .insert(review);
      if (error) throw error;
      set((state) => ({ reviews: [review, ...state.reviews] }));
    } catch (error) {
      console.error("Error uploading review:", error);
    }
  },
}));
